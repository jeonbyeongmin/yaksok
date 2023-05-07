import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'server/lib/mongoose/dbConnect';
import Participant from 'server/models/Participant.model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const participant = await Participant.findById(id);
        if (!participant) {
          return res.status(400).json({});
        }
        res.status(200).json({ participant });
      } catch (error) {
        res.status(400).json({});
      }
      break;

    case 'PATCH':
      try {
        const participant = await Participant.findByIdAndUpdate(
          id,
          { $set: req.body },
          {
            new: true,
            runValidators: true,
          },
        );
        res.status(200).json({ participant });
      } catch (error) {
        res.status(400).json({});
      }
      break;

    default:
      res.status(400).json({});
      break;
  }
}

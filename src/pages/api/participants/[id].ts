import { NextApiRequest, NextApiResponse } from 'next';

import Participant from 'server/models/Participant.model';
import dbConnect from 'server/lib/mongoose/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const participant = await Participant.findById(id);
        if (!participant) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: participant });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT' /* Edit a model by its ID */:
      try {
        const participant = await Participant.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!participant) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: participant });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedParticipant = await Participant.deleteOne({ _id: id });
        if (!deletedParticipant) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

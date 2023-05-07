import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'server/lib/mongoose/dbConnect';
import Event from 'server/models/Event.model';

export const getEventById = async (id: string) => {
  await dbConnect();
  const event = await Event.findById(id);
  return JSON.parse(JSON.stringify(event));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const event = await getEventById(id as string);
        if (!event) {
          return res.status(400).json({});
        }
        res.status(200).json({ event });
      } catch (error) {
        res.status(400).json({});
      }
      break;

    default:
      res.status(400).json({});
      break;
  }
}

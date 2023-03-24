import { NextApiRequest, NextApiResponse } from 'next';

import Event from 'server/models/Event.model';
import dbConnect from 'server/lib/mongoose/dbConnect';

export const getEventById = async (id: string) => {
  await dbConnect();
  const event = await Event.findById(id);
  return JSON.parse(JSON.stringify(event));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const event = await getEventById(id as string);
        if (!event) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, event });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

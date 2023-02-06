import type { NextApiRequest, NextApiResponse } from 'next';

import Event from 'server/models/Event.model';
import dbConnect from 'server/lib/mongoose/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const event = await Event.create(req.body);
        res.status(201).json({ success: true, data: event });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

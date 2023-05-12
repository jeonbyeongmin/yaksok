import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from 'server/lib/mongoose/dbConnect';
import Participant from 'server/models/participant.model';

import type { Participant as ParticipantType } from 'common/interfaces/participant.interface';
export const getParticipants = async (eventId: string) => {
  await dbConnect();
  const participants = await Participant.find({ eventId });
  return JSON.parse(JSON.stringify(participants));
};

export const createParticipant = async (participant: ParticipantType) => {
  await dbConnect();
  const newParticipant = await Participant.create(participant);
  return JSON.parse(JSON.stringify(newParticipant));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { eventId },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const participants = await getParticipants(eventId as string);
        res.status(200).json({ participants });
      } catch (error) {
        res.status(400).json({});
      }
      break;

    case 'POST':
      try {
        const participant = await createParticipant(req.body);

        res.setHeader(
          'set-cookie',
          `${participant.eventId}-participantId=${participant._id}; path=/; httponly; sameSite=lax; max-age=604800`,
        );

        res.status(201).json({ participant });
      } catch (error) {
        res.status(400).json({});
      }
      break;

    default:
      res.status(400).json({});
      break;
  }
}

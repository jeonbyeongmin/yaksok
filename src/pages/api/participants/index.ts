import type { NextApiRequest, NextApiResponse } from 'next';

import Participant from 'server/models/Participant.model';
import dbConnect from 'server/lib/mongoose/dbConnect';
import type { Participant as ParticipantType } from 'common/inerfaces/Participant.interface';

export const getParticipants = async (eventID: string) => {
  await dbConnect();
  const participants = await Participant.find({ eventID });
  return JSON.parse(JSON.stringify(participants));
};

export const createParticipant = async (participant: ParticipantType) => {
  await dbConnect();
  const newParticipant = await Participant.create(participant);
  return JSON.parse(JSON.stringify(newParticipant));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { eventID },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const participants = await getParticipants(eventID as string);
        res.status(200).json({ success: true, participants });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        const participant = await createParticipant(req.body);

        res.setHeader(
          'set-cookie',
          `${participant.eventID}-participantID=${participant._id}; path=/; httponly; sameSite=lax; max-age=604800`
        );

        res.status(201).json({ success: true, participant });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

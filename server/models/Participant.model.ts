import { Participant } from 'server/inerfaces/Participant.interface';
import mongoose from 'mongoose';

const ParticipantScheme = new mongoose.Schema<Participant>({
  name: String,
  eventID: String,
  availableIndexes: [String],
});

export default mongoose.models.Participant ||
  mongoose.model('Participant', ParticipantScheme);

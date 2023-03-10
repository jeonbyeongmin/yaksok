import { Participant } from 'common/inerfaces/Participant.interface';
import mongoose from 'mongoose';

const ParticipantScheme = new mongoose.Schema<Participant>(
  {
    name: String,
    eventID: String,
    availableIndexes: [String],
  },
  { timestamps: true }
);

ParticipantScheme.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });

export default mongoose.models.Participant || mongoose.model('Participant', ParticipantScheme);

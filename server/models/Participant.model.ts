import { Participant } from 'common/inerfaces/participant.interface';
import mongoose from 'mongoose';

const ParticipantScheme = new mongoose.Schema<Participant>(
  {
    name: String,
    eventId: String,
    availableIndexes: [String],
  },
  { timestamps: true },
);

ParticipantScheme.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });

export default mongoose.models.Participant ||
  mongoose.model('Participant', ParticipantScheme);

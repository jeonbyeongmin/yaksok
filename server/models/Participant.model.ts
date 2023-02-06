import { Participant } from 'server/inerfaces/Participant.interface';
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema<Participant>({
  name: String,
  possibleDates: [
    {
      startDate: Date,
      endDate: Date,
    },
  ],
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);

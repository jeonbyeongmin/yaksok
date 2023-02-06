import { Event } from 'server/inerfaces/Event.interface';
import Participant from 'server/models/Participant.model';
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema<Event>({
  startDate: Date,
  endDate: Date,
  startTime: Number,
  endTime: Number,
  title: String,
  participantsNumber: Number,
  participants: [Participant],
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);

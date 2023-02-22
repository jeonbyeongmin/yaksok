import { Event } from 'common/inerfaces/Event.interface';
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema<Event>({
  startDate: Date,
  endDate: Date,
  startTime: Number,
  endTime: Number,
  title: String,
  participantsNumber: Number,
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);

import { Event } from 'common/inerfaces/event.interface';
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema<Event>(
  {
    startDate: Date,
    endDate: Date,
    startTime: Number,
    endTime: Number,
    title: String,
  },
  { timestamps: true },
);

EventSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });

export default mongoose.models.Event || mongoose.model('Event', EventSchema);

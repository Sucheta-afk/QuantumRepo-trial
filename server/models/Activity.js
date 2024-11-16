import mongoose from 'mongoose';

export const ActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  additionalData: { type: mongoose.Schema.Types.Mixed },
});

const Activity = mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);

export default Activity;

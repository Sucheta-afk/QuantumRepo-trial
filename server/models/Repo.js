import mongoose from 'mongoose';

export const RepoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    },
  ],
});

const Repo = mongoose.models.Repo || mongoose.model('Repo', RepoSchema);

export default Repo;

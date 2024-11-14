import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  repoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Repo', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const File = mongoose.models.File || mongoose.model('File', FileSchema);

export default File;

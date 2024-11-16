import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  repositories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repo",
    },
  ],
  activity: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

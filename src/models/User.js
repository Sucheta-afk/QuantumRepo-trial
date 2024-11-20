import mongoose from "mongoose";
import { RepoSchema } from "./Repo.js"
import { ActivitySchema } from "./Activity.js"

const UserSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  repositories: [RepoSchema],
  activity: [ActivitySchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
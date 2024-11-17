import User from "../models/Users.js";

// Get user by Firebase UID, including repositories and activity
export const getUserData = async (req, res) => {
  const { firebaseUid } = req.query;

  if (!firebaseUid) {
    return res.status(400).json({ error: "Firebase UID is required" });
  }

  try {
    const user = await User.findOne({ firebaseUid })
      .populate("repositories")
      .populate("activity");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = {
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
      repositories: user.repositories,
      activity: user.activity,
    };

    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Failed to fetch user data" });
  }
};

export const getUserProfile = async (req, res) => {
  const { firebaseUid } = req.query;

  if (!firebaseUid) {
    return res.status(400).json({ error: "Firebase UID is required" });
  }

  try {
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      avatarUrl: user.avatarUrl,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

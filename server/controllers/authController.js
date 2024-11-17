import admin from 'firebase-admin';
import User from '../models/Users.js';
import dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

// Login/Signup using Google Sign-In
export const googleLoginHandler = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Missing token" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, picture, uid } = decodedToken;

    if (!email) {
      return res.status(400).json({ error: "No email associated with Google account" });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({
        message: "Google login successful",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          avatarUrl: user.avatarUrl,
        },
      });
    } else {
      user = new User({
        firebaseUid: uid,
        username: name || email.split('@')[0],
        email,
        avatarUrl: picture || '',
      });
      
      await user.save();

      return res.status(200).json({
        message: "User created and logged in successfully",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          avatarUrl: user.avatarUrl,
        },
      });
    }
  } catch (error) {
    console.error("Error during Google login:", error);
    return res.status(500).json({ error: "Google login failed" });
  }
};

// Login/Signup using GitHub Sign-In
export const githubLoginHandler = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Missing token" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, picture, uid } = decodedToken;

    if (!email) {
      return res.status(400).json({ error: "No email associated with GitHub account" });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({
        message: "GitHub login successful",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          avatarUrl: user.avatarUrl,
        },
      });
    } else {
      user = new User({
        firebaseUid: uid,
        username: name || email.split('@')[0],
        email,
        avatarUrl: picture || '',
      });

      await user.save();

      return res.status(200).json({
        message: "User created and logged in successfully",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          avatarUrl: user.avatarUrl,
        },
      });
    }
  } catch (error) {
    console.error("Error during GitHub login:", error);
    return res.status(500).json({ error: "GitHub login failed" });
  }
};

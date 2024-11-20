import { NextResponse } from "next/server";
import admin from "firebase-admin";
import User from "@/models/User.js";
import connectDB from "@/utils/dbConnect";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON from request body
    const { token, provider } = body;

    if (!token || !provider) {
      return NextResponse.json({ error: "Missing token or provider" }, { status: 400 });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { email, name, picture, uid } = decodedToken;

    if (!email) {
      return NextResponse.json({ error: "No email associated with the account" }, { status: 400 });
    }

    await connectDB();
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        firebaseUid: uid,
        username: name || email.split("@")[0],
        email,
        avatarUrl: picture || "",
      });
      await user.save();
    }

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

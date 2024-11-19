import { NextResponse } from "next/server";
import User from "@/models/User.js";

// GET: Fetch user data or user profile based on query parameters
export async function GET(req) {
  const url = new URL(req.url);
  const firebaseUid = url.searchParams.get("firebaseUid");

  if (!firebaseUid) {
    return NextResponse.json(
      { error: "Firebase UID is required" },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ firebaseUid })
      .populate("repositories")
      .populate("activity");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If only the profile (avatarUrl) is needed
    const profile = url.searchParams.get("profile");
    if (profile) {
      return NextResponse.json(
        {
          avatarUrl: user.avatarUrl,
        },
        { status: 200 }
      );
    }

    // If user data with repositories/activity is needed
    const userData = {
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
      repositories: user.repositories,
      activity: user.activity,
    };

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}

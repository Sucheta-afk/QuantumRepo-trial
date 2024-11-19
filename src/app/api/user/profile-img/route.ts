import { NextResponse } from "next/server";
import User from "@/models/User.js";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const firebaseUid = searchParams.get("firebaseUid");

  if (!firebaseUid) {
    return NextResponse.json({ error: "Firebase UID is required" }, { status: 400 });
  }

  try {
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const { avatarUrl } = user;

    return NextResponse.json({ avatarUrl });
  } catch (error) {
    console.error("Error fetching profile image:", error);
    return NextResponse.json({ error: "Failed to fetch profile image" }, { status: 500 });
  }
}

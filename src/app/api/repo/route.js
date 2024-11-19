import { NextResponse } from "next/server";
import User from "@/models/User.js";
import Repo from "@/models/Repo.js";
import File from "@/models/File.js";

// Get repository details
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const firebaseUid = searchParams.get("firebaseUid");
    const repoName = searchParams.get("repoName");
  
    // If only firebaseUid is provided, return all repositories for that user
    if (firebaseUid && !repoName) {
      try {
        const user = await User.findOne({ firebaseUid }).populate({
          path: "repositories",
          populate: { path: "files" },
        });
  
        if (!user) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
  
        return NextResponse.json(user.repositories, { status: 200 });
      } catch (error) {
        console.error("Error fetching repositories:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
    }
  
    // If both firebaseUid and repoName are provided, return specific repo details
    if (firebaseUid && repoName) {
      try {
        const user = await User.findOne({ firebaseUid }).populate({
          path: "repositories",
          populate: { path: "files" },
        });
  
        if (!user) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
  
        const repo = user.repositories.find((repo) => repo.name === repoName);
  
        if (!repo) {
          return NextResponse.json({ error: "Repository not found" }, { status: 404 });
        }
  
        return NextResponse.json(repo, { status: 200 });
      } catch (error) {
        console.error("Error fetching repository details:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
    }
  
    // If neither firebaseUid nor repoName are provided, return an error
    return NextResponse.json(
      { error: "Missing required parameters: firebaseUid, repoName" },
      { status: 400 }
    );
  }
  

// Create a new repository
export async function POST(req) {
  const body = await req.json();
  const { firebaseUid, name, description, language } = body;

  if (!firebaseUid || !name || !description || !language) {
    return NextResponse.json(
      { error: "Missing required fields: firebaseUid, name, description, and language" },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create new repository
    const newRepo = new Repo({
      name,
      description,
      language,
      userId: user._id,
    });

    await newRepo.save();

    const indexHtmlFile = new File({
      name: "index.html",
      content: `<!DOCTYPE html><html><head><title>${name}</title></head><body><h1>Welcome to ${name}!</h1></body></html>`,
      repoId: newRepo._id,
    });

    await indexHtmlFile.save();

    newRepo.files.push(indexHtmlFile);
    await newRepo.save();

    user.repositories.push(newRepo);
    await user.save();

    return NextResponse.json(newRepo, { status: 201 });
  } catch (error) {
    console.error("Error creating repository:", error);
    return NextResponse.json({ error: "Failed to create repository" }, { status: 500 });
  }
}

// Delete a repository
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const firebaseUid = searchParams.get("firebaseUid");
  const repoName = searchParams.get("repoName");

  if (!firebaseUid || !repoName) {
    return NextResponse.json(
      { error: "Missing required parameters: firebaseUid, repoName" },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ firebaseUid }).populate("repositories");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const repo = user.repositories.find((repo) => repo.name === repoName);

    if (!repo) {
      return NextResponse.json({ error: "Repository not found" }, { status: 404 });
    }

    user.repositories = user.repositories.filter((r) => r.name !== repoName);
    await user.save();

    await Repo.findByIdAndDelete(repo._id);

    await File.deleteMany({ repoId: repo._id });

    return NextResponse.json(
      { message: "Repository and its files have been deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting repository:", error);
    return NextResponse.json({ error: "Failed to delete repository" }, { status: 500 });
  }
}

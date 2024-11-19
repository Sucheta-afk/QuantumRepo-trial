import { NextResponse } from 'next/server';
import User from '@/models/User.js';
import Repo from '@/models/Repo.js';
import File from '@/models/File.js';
import dbConnect from '@/utils/dbConnect';

// GET: Retrieve all files for the user's repository
export async function GET(request, { params }) {
  const { firebaseUid, repoName } = params;
  
  await dbConnect();

  try {
    const files = await getAllFilesInRepo(repoName, firebaseUid);
    return NextResponse.json(files);
  } catch (err) {
    return NextResponse.json({ message: "Error retrieving files", error: err.message }, { status: 500 });
  }
}

// POST: Add a new file to the repository
export async function POST(request, { params }) {
  const { firebaseUid, repoName } = params;
  const { name, content } = await request.json();

  await dbConnect();

  try {
    const newFile = await addFileToRepo(repoName, firebaseUid, name, content);
    return NextResponse.json(newFile, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error adding file", error: err.message }, { status: 500 });
  }
}

async function getAllFilesInRepo(repoName, firebaseUid) {
  const user = await User.findOne({ firebaseUid });

  if (!user) throw new Error('User not found');

  const repo = await Repo.findOne({ name: repoName, userId: user._id });

  if (!repo) throw new Error('Repository not found or does not belong to the user.');

  return await File.find({ repoId: repo._id });
}

async function addFileToRepo (repoName, firebaseUid, name, content) {
  try {
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      throw new Error('User not found');
    }

    const repo = await Repo.findOne({ userId: user._id, name: repoName });

    if (!repo) {
      throw new Error('Repository not found or does not belong to the user.');
    }

    const newFile = new File({ name, content, repoId: repo._id });
    console.log(newFile);
    await newFile.save();
  
    repo.files.push(newFile);
    await repo.save();


    return newFile;
  } catch (err) {
    console.error("Error in addFileToRepo:", err.message);
    throw new Error("Error adding file to the database: " + err.message);
  }
}; 
import { NextResponse } from 'next/server';
import User from '@/models/User.js';
import Repo from '@/models/Repo.js';
import File from '@/models/File.js';
import dbConnect from '@/utils/dbConnect';

// PATCH: Save a single file's content in the repository
export async function PATCH(request, { params }) {
  const { firebaseUid, repoName, fileName } = params;
  const { content } = await request.json();

  await dbConnect();

  try {
    const updatedFile = await saveFileContent(repoName, firebaseUid, fileName, content);
    return NextResponse.json(updatedFile);
  } catch (err) {
    return NextResponse.json(
      { message: 'Error saving file', error: err.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete a file from the repository
export async function DELETE(request, { params }) {
  const { firebaseUid, repoName, fileName } = params;

  await dbConnect();

  try {
    await deleteFileFromRepo(repoName, firebaseUid, fileName);
    return NextResponse.json({ message: 'File deleted successfully' }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error deleting file', error: err.message },
      { status: 500 }
    );
  }
}

async function saveFileContent(repoName, firebaseUid, fileName, content) {
    const user = await User.findOne({ firebaseUid }).populate({
      path: 'repositories',
      match: { name: repoName },
      populate: { path: 'files' },
    });
  
    if (!user) throw new Error('User not found');
    const repo = user.repositories[0];
  
    if (!repo) throw new Error('Repository not found');
  
    return await File.findOneAndUpdate(
      { repoId: repo._id, name: fileName },
      { content },
      { new: true }
    );
  }
  
  async function deleteFileFromRepo(repoName, firebaseUid, fileName) {
    const user = await User.findOne({ firebaseUid });
    if (!user) throw new Error('User not found');
  
    const repo = await Repo.findOne({ name: repoName, userId: user._id });
    if (!repo) throw new Error('Repository not found or does not belong to the user.');
  
    // Find and delete the file from the File collection
    const file = await File.findOneAndDelete({ repoId: repo._id, name: fileName });
    if (!file) throw new Error('File not found in the repository.');
  
    // Remove the file object from the `files` array in the Repo
    repo.files = repo.files.filter(
      (presentFile) => presentFile._id.toString() !== file._id.toString()
    );
    await repo.save();
  
    return { message: 'File deleted successfully', file };
  }
  
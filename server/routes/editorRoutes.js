import express from 'express';
import User from '../models/Users.js';
import Repo from '../models/Repo.js';
import File from '../models/File.js';

const router = express.Router();

// Function to get all files for a user's repository
const getAllFilesInRepo = async (repoName, firebaseUid) => {
    try {
      const user = await User.findOne({ firebaseUid });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const repo = await Repo.findOne({ name: repoName, userId: user._id });
  
      if (!repo) {
        throw new Error('Repository not found or does not belong to the user.');
      }
  
      const files = await File.find({ repoId: repo._id });
  
      return files;
    } catch (err) {
      throw new Error("Error retrieving files from database: " + err.message);
    }
  };

// Function to save individual file content in a repository
const saveFileContent = async (repoName, firebaseUid, fileName, content) => {
    try {
      const user = await User.findOne({ firebaseUid }).populate({
        path: 'repositories',
        match: { name: repoName },
        populate: { path: 'files' }
      });
  
      if (!user) throw new Error('User not found');
      const repo = user.repositories[0];
  
      if (!repo) throw new Error('Repository not found');
  
      const updatedFile = await File.findOneAndUpdate(
        { repoId: repo._id, name: fileName },
        { content },
        { new: true }
      );
      return updatedFile;
    } catch (err) {
      throw new Error("Error saving file content: " + err.message);
    }
  };  

// Function to add a new file to the repository
const addFileToRepo = async (repoName, firebaseUid, name, content) => {
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
      await newFile.save();
    
      repo.files.push(newFile._id);
      await repo.save();
  
      return newFile;
    } catch (err) {
      console.error("Error in addFileToRepo:", err.message);
      throw new Error("Error adding file to the database: " + err.message);
    }
  }; 

// Function to delete a file from the repository
const deleteFileFromRepo = async (repoName, firebaseUid, fileName) => {
    try {
      const user = await User.findOne({ firebaseUid });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const repo = await Repo.findOne({ name: repoName, userId: user._id });
  
      if (!repo) {
        throw new Error('Repository not found or does not belong to the user.');
      }
  
      const file = await File.findOneAndDelete({ repoId: repo._id, name: fileName });
  
      if (!file) {
        throw new Error('File not found in the repository.');
      }
  
      repo.files = repo.files.filter(fileId => fileId.toString() !== file._id.toString());
      await repo.save();
  
      return { message: 'File deleted successfully', file };
    } catch (err) {
      throw new Error("Error deleting file from the database: " + err.message);
    }
  };
   

// GET: Retrieve all files for the user's repository
router.get("/:firebaseUid/:repoName/files", async (req, res) => {
    const { firebaseUid, repoName } = req.params;
    try {
      const files = await getAllFilesInRepo(repoName, firebaseUid);
      res.status(200).json(files);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving files", error: err.message });
    }
  });
  
  // PATCH: Save a single file's content in the repository
  router.patch("/:firebaseUid/:repoName/files/:fileName", async (req, res) => {
    const { firebaseUid, repoName, fileName } = req.params;
    const { content } = req.body;
    try {
      const updatedFile = await saveFileContent(repoName, firebaseUid, fileName, content);
      res.status(200).json(updatedFile);
    } catch (err) {
      res.status(500).json({ message: "Error saving file", error: err.message });
    }
  });
  
  // POST: Add a new file to the repository
  router.post("/:firebaseUid/:repoName/files", async (req, res) => {
    const { firebaseUid, repoName } = req.params;
    const { name, content } = req.body;
    try {
      const newFile = await addFileToRepo(repoName, firebaseUid, name, content);
      res.status(201).json(newFile);
    } catch (err) {
      res.status(500).json({ message: "Error adding file", error: err.message });
    }
  });
  
  // DELETE: Delete a file from the repository
  router.delete("/:firebaseUid/:repoName/files/:fileName", async (req, res) => {
    const { firebaseUid, repoName, fileName } = req.params;
    try {
      await deleteFileFromRepo(repoName, firebaseUid, fileName);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: "Error deleting file", error: err.message });
    }
  });

  export default router;

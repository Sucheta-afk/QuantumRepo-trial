import User from "../models/Users.js";
import Repo from "../models/Repo.js";
import File from "../models/File.js";

// Get repository details
export const getRepoDetails = async (req, res) => {
    const { firebaseUid, repoName } = req.params;
  
    try {
      const user = await User.findOne({ firebaseUid }).populate({
        path: 'repositories',
        populate: { path: 'files' }
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const repo = user.repositories.find((repo) => repo.name === repoName);
  
      if (!repo) {
        return res.status(404).json({ message: "Repository not found" });
      }
  
      res.status(200).json(repo);
    } catch (error) {
      console.error("Error fetching repository:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };  

// Get all repositories for a user
export const getRepositories = async (req, res) => {
    const { firebaseUid } = req.query;
  
    if (!firebaseUid) {
        return res.status(400).json({ error: "Firebase UID is required" });
    }
  
    try {
        const user = await User.findOne({ firebaseUid }).populate("repositories");
  
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const repositories = await Repo.find({ _id: { $in: user.repositories } });
  
        return res.status(200).json({ repositories });
    } catch (error) {
        console.error("Error fetching user repositories:", error);
        return res.status(500).json({ error: "Failed to fetch user repositories" });
    }
};

export const createRepository = async (req, res) => {
    const { firebaseUid, name, description, language } = req.body;

    if (!firebaseUid || !name || !description || !language) {
        return res.status(400).json({ error: "Missing required fields: firebaseUid, name, description, and language" });
    }

    try {
        const user = await User.findOne({ firebaseUid });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
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
            name: 'index.html',
            content: '<!DOCTYPE html><html><head><title>' + name + '</title></head><body><h1>Welcome to ' + name + '!</h1></body></html>',
            repoId: newRepo._id,
        });

        await indexHtmlFile.save();

        newRepo.files.push(indexHtmlFile);
        await newRepo.save();

        user.repositories.push(newRepo);
        await user.save();

        return res.status(201).json(newRepo);
    } catch (error) {
        console.error("Error creating repository:", error);
        return res.status(500).json({ error: "Failed to create repository" });
    }
};

// Delete a repository
export const deleteRepository = async (req, res) => {
    const { firebaseUid, repoName } = req.params;

    try {
        const user = await User.findOne({ firebaseUid }).populate("repositories");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const repo = user.repositories.find((repo) => repo.name === repoName);

        if (!repo) {
            return res.status(404).json({ message: "Repository not found" });
        }

        user.repositories = user.repositories.filter((r) => r.name !== repoName);
        await user.save();

        await Repo.findByIdAndDelete(repo._id);

        await File.deleteMany({ repoId: repo._id });

        return res.status(200).json({ message: "Repository and its files have been deleted successfully" });
    } catch (error) {
        console.error("Error deleting repository:", error);
        res.status(500).json({ message: "Failed to delete repository" });
    }
};

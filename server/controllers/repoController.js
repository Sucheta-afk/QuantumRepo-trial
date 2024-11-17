import User from "../models/Users.js";
import Repo from "../models/Repo.js";
import File from "../models/File.js";

// Get repository details
export const getRepoDetails = async (req, res) => {
    const { firebaseUid, repoName } = req.params;

    try {
        // Find the user by Firebase UID
        const user = await User.findOne({ firebaseUid }).populate("repositories");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the repository by name in the user's repositories array
        const repo = user.repositories.find((repo) => repo.name === repoName);

        if (!repo) {
            return res.status(404).json({ message: "Repository not found" });
        }

        // Return the repository details (no need to populate files here)
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

// Create a new repository
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
  
        const newRepo = new Repo({
            name,
            description,
            language,
            userId: user._id,
        });
  
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

        // Find the repository by name in the user's repositories array
        const repo = user.repositories.find((repo) => repo.name === repoName);

        if (!repo) {
            return res.status(404).json({ message: "Repository not found" });
        }

        // Remove the repository from the user's repositories array
        user.repositories = user.repositories.filter((r) => r.name !== repoName);
        await user.save();

        // Delete the repository itself from the Repo collection
        await Repo.findByIdAndDelete(repo._id);

        // Delete all files associated with the repository
        await File.deleteMany({ repoId: repo._id });

        return res.status(200).json({ message: "Repository and its files have been deleted successfully" });
    } catch (error) {
        console.error("Error deleting repository:", error);
        res.status(500).json({ message: "Failed to delete repository" });
    }
};

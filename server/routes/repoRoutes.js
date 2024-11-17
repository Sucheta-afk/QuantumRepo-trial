import express from 'express';
import { createRepository, getRepositories, getRepoDetails, deleteRepository } from '../controllers/repoController.js';

const router = express.Router();

router.get("/repositories", getRepositories);

router.post("/repository/add", createRepository);

router.get('/:firebaseUid/repo/:repoName', getRepoDetails);

router.delete('/:firebaseUid/repo/:repoName', deleteRepository);

export default router;
import express from 'express';
import { googleLoginHandler, githubLoginHandler } from '../controllers/authController.js';

const router = express.Router();

// Google Login Route
router.post('/googleLogin', googleLoginHandler);

// GitHub Login Route (New)
router.post('/githubLogin', githubLoginHandler);

export default router;


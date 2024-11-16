import express from 'express';
import { getUserData, getUserProfile } from '../controllers/userController.js';

const router = express();

router.get('/user', getUserData);

router.get('/user/profile-img', getUserProfile);

export default router;
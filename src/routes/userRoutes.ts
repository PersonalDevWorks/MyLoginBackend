import { Router } from 'express';
import { createUser, getAllUsers, } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Define a route for GET requests to the root URL
router.get('/', authenticateToken, getAllUsers);
router.post('/', createUser);

export default router;
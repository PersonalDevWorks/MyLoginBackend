import { Router } from 'express';
import { createUser, getAllUsers, } from '../controllers/userController';

const router = Router();

// Define a route for GET requests to the root URL
router.get('/', getAllUsers);
router.post('/', createUser);

export default router;
import express, { Router } from 'express';

import { login, register, getAllUsers } from '../controllers/user-controllers';

const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getAllUsers);

export default router;

import express, { Router } from 'express';

import { register } from '../controllers/user-controllers';

const router: Router = express.Router();

router.post('/register', register);

export default router;

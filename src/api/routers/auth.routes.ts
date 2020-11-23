import { Router } from 'express';
import { login } from '../controllers';

export const authRouter = Router();

authRouter.post('/login', login);

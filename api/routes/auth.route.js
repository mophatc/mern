import express from 'express';
import { signUp } from '../controllers/auth.control.js';
const router = express.Router();

router.post('/signup', signUp)


export default router;
import express from 'express';
import { googleSignUp, signin, signOut, signUp } from '../controllers/auth.control.js';
const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signin);
router.post('/google', googleSignUp);
router.get('/signOut', signOut);


export default router;
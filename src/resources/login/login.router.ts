import express from 'express';
import loginService from './login.service';

const router = express.Router();

router.route('/').post(loginService.login);

export default router;

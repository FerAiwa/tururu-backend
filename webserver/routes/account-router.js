import express from 'express';
import { login, activateAccount, createAccount } from '../interfaces/controllers/account';
import accountErrorHandler from '../interfaces/mappers/errors/account-error-handler';
import JoiErrorMapper from '../interfaces/mappers/errors/joi-error-mapper';

// PATH: /ACCOUNT
const router = express.Router();

router.get('/activate', activateAccount);
router.post('/login', login);
router.post('/signup', createAccount);

router.use(JoiErrorMapper, accountErrorHandler);

export default router;

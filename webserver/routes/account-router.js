import express from 'express';
import validateFormSchema from '../middlewares/validateFormSchema';
import { login, activateAccount, createAccount } from '../interfaces/controllers/account';
import accountErrorHandler from '../interfaces/mappers/errors/account-error-handler';

// PATH: /ACCOUNT
const router = express.Router();

router.get('/activate', activateAccount);

router.post('/login', login);

router.route('/logout');

router.post('/signup', validateFormSchema, createAccount);


router.use(accountErrorHandler);

export default router;

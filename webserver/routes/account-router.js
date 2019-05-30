import express from 'express';
import checkWebtoken from '../middlewares/checkWebtoken';
import validateFormSchema from '../middlewares/validateFormSchema';
import * as accountController from '../interfaces/controllers/account';

import accountErrorHandler from '../interfaces/mappers/errors/account-error-handler';

// PATH: /ACCOUNT
const router = express.Router();

router
  .get('/', checkWebtoken, (req, res) => res.send('welcome to tijuana, tequila sexo y marihuana!'));

router
  .get('/activate', accountController.activateAccount);

router
  .post('/login', validateFormSchema, accountController.login);

router
  .route('/logout');

router
  .post('/signup', validateFormSchema, accountController.createAccount);


router.use(accountErrorHandler);

export default router;

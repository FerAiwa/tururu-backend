import express from 'express';
import checkWebtoken from '../middlewares/checkWebtoken';
import validateFormSchema from '../middlewares/validateFormSchema';
import * as accountController from '../controllers/account';
import accountErrorHandler from '../controllers/errors/account-error-handler';

// Root of /account
const router = express.Router();

router.get('/', checkWebtoken, (req, res) => res.send('welcome to tijuana, tequila sexo y marihuana!'));

router.route('/activate')
  .get(accountController.activateAccount);

router.route('/login')
  .post(validateFormSchema, accountController.login);

router.route('/logout');

router.route('/signup')
  .post(validateFormSchema, accountController.createAccount);

// Error handling
router.use(accountErrorHandler);

export default router;

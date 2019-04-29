import express from 'express';
import * as accountController from '../controllers/account';
import checkWebtoken from '../middlewares/checkWebtoken';
import validateFormSchema from '../middlewares/validateFormSchema';

const router = express.Router();

// Root of /account
router.get('/', checkWebtoken, (req, res) => res.send('welcome to tijuana, tequila sexo y marihuana!'));

router.route('/activate')
  .get(accountController.activateAccount);

router
  .route('/login')
  .post(validateFormSchema, accountController.login);

router
  .route('/logout');

router
  .route('/signup')
  .post(validateFormSchema, accountController.createAccount);

export default router;

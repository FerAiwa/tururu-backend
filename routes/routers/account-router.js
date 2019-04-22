'use strict';
import express from 'express';
import { accountController } from '../controllers';
import validateFormSchema from '../middlewares/validateFormSchema';

const router = express.Router();

//Root of /account
router.route('/')

router.route("/activate")
  .get(accountController.activateAccount)

router
  .route("/login")

router
  .route("/logout")

router
  .route("/signup")
  .post(validateFormSchema, accountController.createAccount)

export default router;

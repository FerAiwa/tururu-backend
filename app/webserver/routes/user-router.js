import express from 'express';
import multer from 'multer';
import checkWebtoken from '../middlewares/checkWebtoken';
import * as userControllers from '../interfaces/controllers/user';
import accountErrorHandler from '../interfaces/mappers/errors/account-error-handler';

// PATH: /USER
const upload = multer();
const router = express.Router();

router.use(checkWebtoken);

router.get('/', userControllers.getUserInfo);

router.post('/avatar', upload.single('avatar'), userControllers.uploadAvatar);

router.get('/search', userControllers.searchUsers);

router.get('/invitation', userControllers.manageProjectInvitation);

router.use(accountErrorHandler);

export default router;

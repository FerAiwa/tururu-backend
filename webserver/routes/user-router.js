import express from 'express';
import multer from 'multer';
import checkWebtoken from '../middlewares/checkWebtoken';
import * as userControllers from '../interfaces/controllers/user';
import accountErrorHandler from '../interfaces/mappers/errors/account-error-handler';

// PATH: /USER
const upload = multer();
const router = express.Router();

router.use(checkWebtoken);

router.get('/projects', userControllers.getProjects);

router.post('/avatar', upload.single('avatar'), userControllers.uploadAvatar);

router.use(accountErrorHandler);

export default router;

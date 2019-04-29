import express from 'express';
import checkWebtoken from '../middlewares/checkWebtoken';
import createProject from '../controllers/project/create-project';
import getUserProjects from '../controllers/project/user-projects';

const router = express.Router();

router.route('/')
  .get(checkWebtoken, getUserProjects)
  .post(checkWebtoken, createProject);

export default router;

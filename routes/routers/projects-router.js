import express from 'express';
import checkWebtoken from '../middlewares/checkWebtoken';
import createProject from '../controllers/project/create-project';
import getUserProjects from '../controllers/project/user-projects';
import addTasks from '../controllers/project/add-tasks';

const router = express.Router();

router.route('/')
  .get(checkWebtoken, getUserProjects)
  .post(checkWebtoken, createProject);

router.route('/tasks')
  .post(checkWebtoken, addTasks);
// .post((req, res) => res.status(200).send(req.query));

export default router;

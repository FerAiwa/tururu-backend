import express from 'express';
import checkWebtoken from '../middlewares/checkWebtoken';
import projectErrorHandler from '../controllers/errors/project-error-handler';

import { getProject, createProject } from '../controllers/project/project';
import { getTasks, addTasks } from '../controllers/project/tasks';
import { createSprint, updateSprint } from '../controllers/project/sprint';
import { startWorkSession, stopWorkSession } from '../controllers/project/worksession';

// PATH: /PROJECTS

/** TODO 28/5
 * - Validate input
 */
const router = express.Router();

router.route('/:projectId')
  .get(checkWebtoken, getProject)
  .post(checkWebtoken, createProject);

router.route('/:projectId/tasks')
  .get(checkWebtoken, getTasks)
  .post(checkWebtoken, addTasks);

router.route('/:projectId/sprint')
  .post(checkWebtoken, createSprint)
  .patch(checkWebtoken, updateSprint);

router.route('/:projectId/worksession')
  .post(checkWebtoken, startWorkSession)
  .patch(checkWebtoken, stopWorkSession);

router.use(projectErrorHandler);

export default router;

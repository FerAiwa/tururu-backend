import express from 'express';
import multer from 'multer';
import checkWebtoken from '../middlewares/checkWebtoken';
import * as projectCT from '../interfaces/controllers/project';
import JoiErrorMapper from '../interfaces/mappers/errors/joi-error-mapper';
import projectErrorHandler from '../interfaces/mappers/errors/project-error-handler';

// PATH: /PROJECTS
const upload = multer();
const router = express.Router();

router.use(checkWebtoken);

router.route('/:projectId')
  .get(projectCT.getProject)
  .post(projectCT.createProject);

router.route('/:projectId/banner')
  .post(upload.single('banner'), projectCT.uploadBanner);

router.route('/:projectId/tasks')
  .get(projectCT.getTasks)
  .post(projectCT.createTasks);

router.route('/:projectId/sprint')
  .post(projectCT.createSprint)
  .patch(projectCT.updateSprint);

router.route('/:projectId/worksession')
  .get(projectCT.getActiveSessions)
  .post(projectCT.startWorkSession)
  .patch(projectCT.stopWorkSession);

router.route('/:projectId/users')
  .get(projectCT.getUsers)
  .post(projectCT.inviteUser)
  .delete(projectCT.removeUser);

router.route('/:projectId/admins')
  .get(projectCT.getAdmins)
  .post(projectCT.addAdmin)
  .delete(projectCT.removeAdmin);


router.use(JoiErrorMapper, projectErrorHandler);

export default router;

import express from 'express';
import checkWebtoken from '../middlewares/checkWebtoken';
import createProject from '../controllers/project/create-project';
import addTasks from '../controllers/project/add-tasks';
import projectService from '../../services/project.service';
import accountErrorHandler from '../controllers/errors/account-error-handler';

const router = express.Router();
// Root /projects
// router.route('/')
//   .get(checkWebtoken, getUserProjects)
//   .post(checkWebtoken, createProject);

// router.route('/:id')
// Add tasks to the project || get project data
// Add new sprint ||
// Add new tasks ||get tasks


router.post('/create', checkWebtoken, createProject);

// Adds tasks || PILA de proyecto
router.post('/:id/tasks', checkWebtoken, addTasks);

// Creates a new sprint
router
  .post('/:id/sprint', checkWebtoken, async (req, res, next) => {
    console.log('/id/sprint');
    console.log('params', req.params)
    const { uuid } = req.claims;
    const sprintData = req.body;
    try {
      await projectService.createSprint(uuid, sprintData);
      return res.status(201).send('id split works'); // should return the location or the sprint id
    } catch (e) {
      return next(e);
    }
  });
router
  .post('/:projectId/worksession/new', checkWebtoken, async (req, res, next) => {
    const { projectId } = req.params;
    const { uuid } = req.claims;
    const { taskId } = req.body;
    console.log(taskId)

    try {
      const newWorksession = await projectService.createWorkSession(uuid, projectId, taskId);
      return res.status(201).json(newWorksession);
    } catch (e) {
      return next(e);
    }
  });
router.post('/:projectId/worksession', checkWebtoken, async (req, res, next) => {
  const { projectId } = req.params;
  const { uuid } = req.claims;
  const workSessionData = req.body;
  try {
    const session = await projectService.finishWorkSession(uuid, projectId, workSessionData);
    if (!session) return res.status(500).send()
    // const newWorksession = await projectService.createWorkSession(uuid, projectId, taskId);
    return res.status(201).json({ session: 'all ok' });
  } catch (e) {
    return next(e);
  }
})

// Assign tasks to current sprint
router
  .post('/:id/:sprint/tasks', checkWebtoken, async (req, res, next) => {
    const { id, sprint } = req.params;
    const { uuid } = req.claims;
    const { tasksId } = req.body;
    try {
      const updatedProject = await projectService.assignTasks(uuid, id, sprint, tasksId);
      res.status(200).json(updatedProject);
    } catch (e) {
      return next(e);
    }
  });

router.use(accountErrorHandler);

export default router;

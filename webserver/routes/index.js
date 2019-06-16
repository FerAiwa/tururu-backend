import accountRouter from './account-router';
import projectsRouter from './projects-router';
import userRouter from './user-router';

/** Set all the API routes for the app */
export default function loadRouters(app) {
  [
    { path: '/account', router: accountRouter },
    { path: '/projects', router: projectsRouter },
    { path: '/user', router: userRouter },
  ]
    .forEach(route => app.use(route.path, route.router));
}

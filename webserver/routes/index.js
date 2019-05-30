import accountRouter from './account-router';
import projectsRouter from './projects-router';

/** Set all the api routes for the app */
export default function loadRouters(app) {
  [
    { path: '/account', router: accountRouter },
    { path: '/projects', router: projectsRouter },
  ]
    .forEach(route => app.use(route.path, route.router));
}

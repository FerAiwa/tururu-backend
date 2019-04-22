'use strict';
import accountRouter from './routers/account-router';
import templateRouter from './routers/template-router';

/** Set all the api routes for the app
 * @param  app 
 */
export default function loadRouters(app) {
  [
    { path: '/account', router: accountRouter },
    { path: '/template', router: templateRouter },
  ]
    .forEach(route => app.use(route.path, route.router))
}
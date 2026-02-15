import express, { Express } from 'express';
import {
  getHomePage,
  getUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
} from 'controllers/user.controller';
import {
  getAdminUserPage,
  getDashboardPage,
} from 'controllers/admin/dashboard.controller';

const router = express.Router();
const webRoutes = (app: Express) => {
  router.get('/', getHomePage);

  router.get('/create-user', getUserPage);

  router.post('/handel-create-user', postCreateUser);

  router.post('/handelDeleteUser/:id', postDeleteUser);

  router.get('/handelViewUser/:id', getViewUser);

  router.post('/handel-update-user', postUpdateUser);

  //admin routes
  router.get('/admin', getDashboardPage);

  router.get('/admin/user', getAdminUserPage);

  app.use('/', router);
};
export default webRoutes;

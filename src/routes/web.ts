import express, { Express } from 'express';
import {
  getHomePage,
  getUserPage,
  postCreateUser,
  postDeleteUser,
} from 'controllers/user.controller';

const router = express.Router();
const webRoutes = (app: Express) => {
  router.get('/', getHomePage);

  router.get('/create-user', getUserPage);

  router.post('/handel-create-user', postCreateUser);

  router.post('/handelDeleteUser/:id', postDeleteUser);

  app.use('/', router);
};
export default webRoutes;

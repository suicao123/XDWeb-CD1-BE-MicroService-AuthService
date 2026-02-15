import express, { Express } from 'express';
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
import {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
} from 'controllers/user.controller';
import {
  getAdminOrderPage,
  getAdminProductPage,
  getAdminUserPage,
  getDashboardPage,
} from 'controllers/admin/dashboard.controller';

const router = express.Router();
const webRoutes = (app: Express) => {
  router.get('/', getHomePage);

  router.get('/create-user', getCreateUserPage);

  router.post('/handel-create-user', postCreateUser);

  router.post('/handelDeleteUser/:id', postDeleteUser);

  router.get('/handelViewUser/:id', getViewUser);

  router.post('/handel-update-user', postUpdateUser);

  //admin routes
  router.get('/admin', getDashboardPage);

  router.get('/admin/user', getAdminUserPage);

  router.get('/admin/order', getAdminOrderPage);

  router.get('/admin/product', getAdminProductPage);
  router.get('/admin/create-user', getCreateUserPage);
  //  router.post('/admin/handel-create-user', postCreateUser);

  router.post(
    '/admin/handel-create-user',
    upload.single('avatar'),
    (req, res) => {
      res.send('oke');
    },
  );

  app.use('/', router);
};
export default webRoutes;

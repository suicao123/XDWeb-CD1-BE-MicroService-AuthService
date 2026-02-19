import express, { Express } from 'express';
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
import fileUploadMiddleware from 'src/middleware/multer';
import { getProductPage } from 'controllers/client/product.controller';
import {
  getCreateProductPage,
  getViewProdcut,
  postCreateProductPage,
  postDeleteProduct,
  postUpdateProduct,
} from 'controllers/admin/product.controller';
import { getLoginPage } from 'controllers/client/login.controller';
import { getRegisterPage } from 'controllers/client/register.controller';

const router = express.Router();
const webRoutes = (app: Express) => {
  //CLIENT
  router.get('/', getHomePage);
  router.get('/login', getLoginPage);
  router.get('/register', getRegisterPage);

  router.get('/product/:id', getProductPage);
  router.get('/create-user', getCreateUserPage);

  router.post('/handel-create-user', postCreateUser);

  router.post('/handelDeleteUser/:id', postDeleteUser);

  router.get('/handelViewUser/:id', getViewUser);

  router.post('/handel-update-user', postUpdateUser);

  //admin routes
  //USER
  router.get('/admin', getDashboardPage);
  router.get('/admin/user', getAdminUserPage);
  router.get('/admin/order', getAdminOrderPage);
  router.get('/admin/create-user', getCreateUserPage);
  router.get('/admin/handelViewUser/:id', getViewUser);
  router.post(
    '/admin/handel-update-user',
    fileUploadMiddleware('avatar', 'images'),
    postUpdateUser,
  );
  //  router.post('/admin/handel-create-user', postCreateUser);
  router.post('/admin/handelDeleteUser/:id', postDeleteUser);
  router.post(
    '/admin/handel-create-user',
    fileUploadMiddleware('avatar', 'images'),
    postCreateUser,
  );

  //PRODUCT
  router.get('/admin/product', getAdminProductPage);

  router.get('/admin/create-product', getCreateProductPage);
  router.post(
    '/admin/create-product',
    fileUploadMiddleware('image', 'images/products'),
    postCreateProductPage,
  );
  router.get('/admin/handelViewProduct/:id', getViewProdcut);
  router.post(
    '/admin/update-product',
    fileUploadMiddleware('image', 'images/products'),
    postUpdateProduct,
  );
  router.post('/admin/handelDeleteProduct/:id', postDeleteProduct);

  app.use('/', router);
};
export default webRoutes;

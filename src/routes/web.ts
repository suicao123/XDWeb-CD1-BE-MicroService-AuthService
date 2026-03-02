import express, { Express } from 'express';
import {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
  getProductFilterPage,
} from 'controllers/user.controller';
import {
  getAdminOrderPage,
  getAdminProductPage,
  getAdminUserPage,
  getDashboardPage,
} from 'controllers/admin/dashboard.controller';
import fileUploadMiddleware from 'src/middleware/multer';
import {
  getCartPage,
  getCheckOutPage,
  getProductPage,
  getThanksPage,
  postAddProductToCart,
  postAddToCartFromDetailPage,
  postDeleteCart,
  postHandelCartToCheckout,
  postPlaceOrder,
} from 'controllers/client/product.controller';
import {
  getCreateProductPage,
  getViewProdcut,
  postCreateProductPage,
  postDeleteProduct,
  postUpdateProduct,
} from 'controllers/admin/product.controller';
import {
  getLoginPage,
  getSuccessRedirectPage,
  postLogout,
} from 'controllers/client/login.controller';
import {
  getRegisterPage,
  postRegister,
} from 'controllers/client/register.controller';
import passport from 'passport';
import { isAdmin, isLogin } from 'src/middleware/auth';
import { getViewOrder } from 'controllers/admin/order.controller';
import { getHistoryPage } from 'controllers/client/history.controller';

const router = express.Router();
const webRoutes = (app: Express) => {
  //CLIENT
  router.get('/', getHomePage);
  router.get('/products', getProductFilterPage);
  router.get('/succes-redirect', getSuccessRedirectPage);
  router.get('/login', getLoginPage);
  router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/succes-redirect',
      failureRedirect: '/login',
      failureMessage: true,
    }),
  );
  router.post('/logout', postLogout);
  router.get('/register', getRegisterPage);
  router.post('/register', postRegister);

  router.get('/product/:id', getProductPage);

  router.post('/add-product-to-cart/:id', isLogin, postAddProductToCart);

  router.get('/cart', isLogin, getCartPage);

  router.post('/delete-product-in-cart/:id', isLogin, postDeleteCart);

  router.get('/checkout', getCheckOutPage);

  router.post('/handel-cart-to-checkout', isLogin, postHandelCartToCheckout);

  router.post('/place-order', isLogin, postPlaceOrder);

  router.get('/thanks', isLogin, getThanksPage);

  router.get('/order-history', getHistoryPage);
  router.post('/add-to-cart-from-detail-page/:id', postAddToCartFromDetailPage);

  // router.get('/create-user', getCreateUserPage);

  // router.post('/handel-create-user', postCreateUser);

  // router.post('/handelDeleteUser/:id', postDeleteUser);

  // router.get('/handelViewUser/:id', getViewUser);

  // router.post('/handel-update-user', postUpdateUser);

  //ADMIN

  //USER PAGE
  router.get('/admin', getDashboardPage);
  router.get('/admin/user', getAdminUserPage);

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

  //PRODUCT PAGE
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

  //ORDER PAGE
  router.get('/admin/order', getAdminOrderPage);
  router.get('/admin/order/:id', getViewOrder);
  app.use('/', isAdmin, router);
};
export default webRoutes;

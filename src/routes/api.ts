import {
  createUserAPI,
  deleteUserById,
  fetchAccountAPI,
  getAllUserAPI,
  getUserById,
  loginAPI,
  postAddProductToCartAPI,
  updateUserById,
} from 'controllers/client/api.controller';
import express, { Express } from 'express';
import { checkValidJWT } from 'src/middleware/jwt.midleware';
const router = express.Router();
const apiRoutes = (app: Express) => {
  router.post('/add-product-to-cart', postAddProductToCartAPI);

  router.get('/users', getAllUserAPI);

  router.get('/users/:id', getUserById);
  router.post('/users', createUserAPI);

  router.put('/users/:id', updateUserById);
  router.delete('/users/:id', deleteUserById);

  router.get('/account', fetchAccountAPI);

  router.post('/login', loginAPI);

  app.use('/api', checkValidJWT, router);
};
export default apiRoutes;

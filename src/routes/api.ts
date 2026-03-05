import {
  createUserAPI,
  deleteUserById,
  getAllUserAPI,
  getUserById,
  loginAPI,
  postAddProductToCartAPI,
  updateUserById,
} from 'controllers/client/api.controller';
import express, { Express } from 'express';
const router = express.Router();
const apiRoutes = (app: Express) => {
  router.post('/add-product-to-cart', postAddProductToCartAPI);

  router.get('/users', getAllUserAPI);

  router.get('/users/:id', getUserById);
  router.post('/users', createUserAPI);

  router.put('/users/:id', updateUserById);
  router.delete('/users/:id', deleteUserById);

router.post('/login', loginAPI);

  app.use('/api', router);
};
export default apiRoutes;

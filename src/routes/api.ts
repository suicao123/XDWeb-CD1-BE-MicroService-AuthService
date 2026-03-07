import {
  loginAPI,
  registerAPI,
  sendOTP,
} from 'controllers/client/api.controller';
import express, { Express } from 'express';

const router = express.Router();
const apiRoutes = (app: Express) => {
  router.post('/auth/login', loginAPI);
  router.post('/auth/send-otp/', sendOTP);
  router.post('/auth/register/', registerAPI);
  app.use('/api', router);
};
export default apiRoutes;

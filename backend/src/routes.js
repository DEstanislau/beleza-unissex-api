import { Router } from 'express';

import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import AvailableController from './app/controllers/AvailableController';
import ResetController from './app/controllers/ResetController';
import ProductController from './app/controllers/ProductController';
import NotificationController from './app/controllers/NotificationController';
import RatingController from './app/controllers/RatingController';
import FavoriteController from './app/controllers/FavoriteController';

import ValidateUserStore from './app/validators/UserStore';
import ValidateUserUpdate from './app/validators/UserUpdate';
import ValidateSessionStore from './app/validators/SessionStore';
import ValidateAppointmentStore from './app/validators/AppointmentStore';
import ValidateForgotPassword from './app/validators/ForgotPassword';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

routes.post('/users', ValidateUserStore, UserController.store);
routes.post('/sessions', ValidateSessionStore, SessionController.store);

routes.put('/reset', ValidateForgotPassword, ResetController.forgotPassword);

routes.use(authMiddleware);

routes.put('/users', ValidateUserUpdate, UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/appointments', AppointmentController.index);
routes.post(
  '/appointments',
  ValidateAppointmentStore,
  AppointmentController.store
);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/products', ProductController.index);
routes.get('/productsm', ProductController.indexMobile);
routes.post('/products', ProductController.store);
routes.delete('/products/:id', ProductController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.put('/ratings/:providerId/:appointmentId', RatingController.update);

// routes.get('/favorites/:providerId', FavoriteController.index);
// routes.post('/favorites/:providerId/', FavoriteController.store);

export default routes;

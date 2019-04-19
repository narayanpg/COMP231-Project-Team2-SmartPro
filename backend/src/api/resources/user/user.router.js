import express from 'express';
import userController from './user.controller';

export const userRouter = express.Router();

userRouter.route('/residents')
  .get(userController.getResidents);

userRouter.route('/staffs')
  .get(userController.getStaff);

userRouter.route('/signup')
  .post(userController.signup);

userRouter.route('/login')
  .post(userController.login);

userRouter.route('/:id')
  .delete(userController.delete)
  .get(userController.findOne)
  .put(userController.update);
import express from 'express';
import {
  requestRouter
} from './resources/request';
import {
  userRouter
} from './resources/user';

export const restRouter = express.Router();
restRouter.use('/requests', requestRouter);
restRouter.use('/users', userRouter);
import express from 'express';
import {
  staffRouter
} from './resources/staff';
import {
  residentRouter
} from './resources/resident';
import {
  requestRouter
} from './resources/request';
import { userRouter } from './resources/user';

export const restRouter = express.Router();
restRouter.use('/requests', requestRouter);
restRouter.use('/residents', residentRouter);
restRouter.use('/staffs', staffRouter);
restRouter.use('/users', userRouter);
import express from 'express';
//import passport from 'passport';
import requestController from './request.controller';

export const requestRouter = express.Router();

requestRouter.route('/')
  .post(requestController.create)
  .get(requestController.findAll);

requestRouter.route('/:id')
  .get(requestController.findOne)
  .delete(requestController.delete)
  .put(requestController.update);
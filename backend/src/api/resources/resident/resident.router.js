import express from 'express';
//import passport from 'passport';
import residentController from './resident.controller';

export const residentRouter = express.Router();

residentRouter.route('/')
  .post(residentController.create)
  .get(residentController.findAll);

  residentRouter.route('/:id')
  .get(residentController.findOne)
  .delete(residentController.delete)
  .put(residentController.update);



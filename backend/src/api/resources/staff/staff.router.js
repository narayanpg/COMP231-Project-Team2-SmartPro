import express from 'express';
import staffController from './staff.controller';

export const staffRouter = express.Router();
staffRouter
  .route('/')
  .post(staffController.create)
  .get(staffController.findAll);

staffRouter
  .route('/:id')
  .get(staffController.findOne)
  .delete(staffController.delete)
  .put(staffController.update);


//to-do add passport and route guard
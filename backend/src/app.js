import express from 'express';
import mongoose from 'mongoose';

import {
  devConfig
} from '../src/config/env/development';

import {
  setGlobalMiddleware
} from './api/middlewares/global-middleware';

import {
  restRouter
} from './api';

const app = express();
const PORT = devConfig.port;

setGlobalMiddleware(app);

app.use('/api', restRouter);


//connect to mongoose
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/${devConfig.database}`, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//error message for invalid route
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.message = 'Invalid route';
  error.status = 404;
  next(error);
});

//for global error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
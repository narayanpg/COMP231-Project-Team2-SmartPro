import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';

export const setGlobalMiddleware = app => {
  app.use(express.json());
  app.use(express.urlencoded({
    extended: false
  }));
  app.use(cors());
  app.use(logger('dev'));
  app.use(passport.initialize({
    userProperty: 'currentUser'
  }));
  //configureJWTStrategy();
}
import HttpStatus from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userService from './user.service';
import Joi from 'joi';
import User from './user.model';
import {
  devConfig
} from '../../../config/env/development';

export default {
  async signup(req, res) {
    try {
      const {
        error,
        value
      } = userService.validateSchema(req.body);
      if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
      }
      const user = await User.create(value);
      return res.json({
        success: true,
        message: 'User created successfully'
      });
    } catch (err) {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).json(err);
    }
  },
  async login(req, res) {
    try {
      const {
        error,
        value
      } = userService.validateSchema(req.body);
      if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
      }
      const user = await User.findOne({
        email: value.email
      });
      if (!user) {
        return res
          .status(BAD_REQUEST)
          .json({
            err: 'invalid email or password'
          });
      }
      const matched = await bcryptjs.compare(value.password, user.password);
      if (!matched) {
        return res.status(UNAUTHORIZED).json({
          err: 'invalid credentials'
        });
      }
      const token = jwt.sign({
        id: user._id,
        fullName: user.fullName,
        dob: user.dob,
        email: user.email,
        accessCode: user.accessCode
      }, devConfig.secret, {
        expiresIn: '1h'
      });
      return res.json({
        success: true,
        token
      });
    } catch (err) {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).json(err);
    }
  },
  async getResidents(req, res) {
    await User.find({
        accessCode: '100res'
      })
      .then(users => res.json(users))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  async getStaff(req, res) {
    await User.find({
        accessCode: '100staff'
      })
      .then(users => res.json(users))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  async test(req, res) {
    return res.json(req.currentUser);
  },
  update(req, res) {
    const {
      id
    } = req.params;
    const schema = Joi.object().keys({
      unitNum: Joi.string().required(),
      accessCode: Joi.string().required(),
      fullName: Joi.string().required(),
      dob: Joi.date().required(),
      email: Joi.string()
        .email()
         .required(),
      password: Joi.string().required()
    });
    const {
      error,
      value
    } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    User.findOneAndUpdate({
        _id: id
      }, value, {
        new: true
      })
      .then(user => res.json(user))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  findOne(req, res) {
    const {
      id
    } = req.params;
    User.findById(id)
      .then(user => {
        if (!user) {
          return res.status(HttpStatus.NOT_FOUND).json({
            err: 'Could not find any user'
          });
        }
        return res.json(user);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  delete(req, res) {
    const {
      id
    } = req.params;
    User.findByIdAndRemove(id)
      .then(user => {
        if (!user) {
          return res.status(HttpStatus.NOT_FOUND).json({
            err: 'Could not delete any user'
          });
        }
        return res.json(user);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },

};
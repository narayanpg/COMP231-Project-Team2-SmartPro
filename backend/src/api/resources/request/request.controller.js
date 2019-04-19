import Joi from 'joi';
import HttpStatus from 'http-status-codes';
//import bcryptjs from 'bcryptjs';
import Request from './request.model';

export default {
  findAllByUser(req, res) {
    const {
      id
    } = req.params;
    Request.find({
        user: id
      })
      .sort({
        date: 'desc'
      })
      .then(request => res.json(request))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  findAll(req, res) {
    Request.find()
      .sort({
        date: 'desc'
      })
      .then(request => res.json(request))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  create(req, res) {
    const schema = Joi.object().keys({
      topic: Joi.string().required(),
      message: Joi.string().required(),
      unit: Joi.string().required(),
      user: Joi.string().required(),
    });
    const {
      error,
      value
    } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Request.create(value)
      .then(request => res.json(request))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },

  findOne(req, res) {
    const {
      id
    } = req.params;
    Request.findById(id)
      .then(request => {
        if (!request) {
          return res.status(HttpStatus.NOT_FOUND).json({
            err: 'Could not find any request'
          });
        }
        return res.json(request);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },

  delete(req, res) {
    const {
      id
    } = req.params;
    Request.findByIdAndRemove(id)
      .then(request => {
        if (!request) {
          return res.status(HttpStatus.NOT_FOUND).json({
            err: 'Could not delete any request'
          });
        }
        return res.json(request);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  update(req, res) {
    const {
      id
    } = req.params;
    const schema = Joi.object().keys({
      topic: Joi.string().required(),
      message: Joi.string().required(),
      unit: Joi.string().required(),
    });
    const {
      error,
      value
    } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Request.findOneAndUpdate({
        _id: id
      }, value, {
        new: true
      })
      .then(request => res.json(request))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
};
import Joi from 'joi';
import HttpStatus from 'http-status-codes';
//import bcryptjs from 'bcryptjs';
import Staff from './staff.model';

export default {
  findAll(req, res) {
    Staff.find()
      .then(staffs => res.json(staffs))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  create(req, res) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      dob: Joi.date().required(),
      workingSince: Joi.date().required(),
      email: Joi.string().required(),
      accessCode: Joi.string().required(),
    });
    const {
      error,
      value
    } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Staff.create(value)
      .then(staff => res.json(staff))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },

  findOne(req, res) {
    const {
      id
    } = req.params;
    Staff.findById(id)
      .then(staff => {
        if (!staff) {
          return res.status(HttpStatus.NOT_FOUND).json({
            err: 'Could not find any staff'
          });
        }
        return res.json(staff);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },

  delete(req, res) {
    const {
      id
    } = req.params;
    Staff.findByIdAndRemove(id)
      .then(staff => {
        if (!staff) {
          return res.status(HttpStatus.NOT_FOUND).json({
            err: 'Could not delete any staff'
          });
        }
        return res.json(staff);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  update(req, res) {
    const {
      id
    } = req.params;
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      dob: Joi.date().required(),
      workingSince: Joi.date().required(),
      email: Joi.string().required(),
      accessCode: Joi.string().required(),
    });
    const {
      error,
      value
    } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Staff.findOneAndUpdate({
        _id: id
      }, value, {
        new: true
      })
      .then(staff => res.json(staff))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },

}
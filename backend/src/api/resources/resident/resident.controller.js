import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import Resident from './resident.model';


export default {
  findAll(req, res) {
    Resident.find()
      .then(residents => res.json(residents))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  create(req, res) {
    const schema = Joi.object().keys({
      unit: Joi.number().required(),
      name: Joi.string().required(),
      // dob: Joi.date().required(),
      livingSince: Joi.date().required(),
      email: Joi.string().required(),
      unitSharedWith: Joi.number().optional(),
      accessCode: Joi.string().required(),
    });
    const {
      error,
      value
    } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Resident.create(value)
      .then(invoice => res.json(invoice))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },

  findOne(req, res) {
    const {
      id
    } = req.params;
    Resident.findById(id)
      .then(resident => {
        if (!resident) {
          return res.status(HttpStatus.NOT_FOUND).json({
            err: 'Could not find any resident'
          });
        }
        return res.json(resident);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },

  delete(req, res) {
    const {
      id
    } = req.params;
    Resident.findByIdAndRemove(id)
      .then(resident => {
        if (!resident) {
          return res.status(HttpStatus.NOT_FOUND).json({
            err: 'Could not delete any resident'
          });
        }
        return res.json(resident);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },

  update(req, res) {
    const {
      id
    } = req.params;
    const schema = Joi.object().keys({
      unit: Joi.number().required(),
      name: Joi.string().required(),
      // dob: Joi.date().required(),
      livingSince: Joi.date().required(),
      email: Joi.string().required(),
      unitSharedWith: Joi.number().optional(),
      accessCode: Joi.string().required(),
    });
    const {
      error,
      value
    } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Resident.findOneAndUpdate({
        _id: id
      }, value, {
        new: true
      })
      .then(resident => res.json(resident))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
};
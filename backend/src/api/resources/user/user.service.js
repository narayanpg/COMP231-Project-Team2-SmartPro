import Joi from 'joi';

export default {
  validateSchema(body) {
    const schema = Joi.object().keys({
      unitNum: Joi.string().optional(),
      accessCode: Joi.string().optional(),
      fullName: Joi.string().optional(),
      dob: Joi.date().optional(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    });
    const {
      error,
      value
    } = Joi.validate(body, schema);
    if (error && error.details) {
      return {
        error
      };
    }
    return {
      value
    };
  },
};
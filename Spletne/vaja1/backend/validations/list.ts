import Joi from "joi";

export const listNameValidationSchema = Joi.object({
  name: Joi.string().required(),
});

export const listIdValidationSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const updateListValidationSchema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().required(),
});

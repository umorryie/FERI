import Joi from "joi";

export const insertChorValidationSchema = Joi.object({
  name: Joi.string().required(),
  until: Joi.date().required(),
  listId: Joi.string().uuid().required(),
});

export const chorIdValidationSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const updateChorValidationSchema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().allow(null),
  until: Joi.date().allow(null),
  done: Joi.boolean().allow(null),
});

import Joi from "joi";

export const insertUpdateChorListTagValidationSchema = Joi.object({
  name: Joi.string().required(),
  id: Joi.string().uuid().required(),
});

export const chorListTagIdValidationSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

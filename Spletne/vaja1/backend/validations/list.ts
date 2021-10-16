import Joi from "joi";

export const insertListValidationSchema = Joi.object({
  name: Joi.string().required(),
});

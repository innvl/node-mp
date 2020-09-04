import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

const bodyValidationSchema = Joi.object(
    {
        login: Joi.string()
            .alphanum()
            .required(),
        password: Joi.string()
            .regex(/\d/, 'contains at least 1 number')
            .regex(/[a-zA-Z]/, 'contains at least 1 letter'),
        age: Joi.number()
            .min(4)
            .max(130)
            .required()
    },
);

const paramsValidationSchema = Joi.object({
    userId: Joi.string()
        .required()
});

const paramsValidationForGetSuggestedUsersSchema = Joi.object({
    limit: Joi.number()
        .min(1)
        .required(),
    loginSubStr: Joi.string()
        .required()
});

export const userBodyValidation = validator.body(bodyValidationSchema);
export const paramsValidation = validator.params(paramsValidationSchema);
export const paramsValidationForGetSuggestedUsers = validator.params(paramsValidationForGetSuggestedUsersSchema);

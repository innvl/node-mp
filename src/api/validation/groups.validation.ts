import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

const groupCreatioinValidationSchema = Joi.object(
    {
        name: Joi.string()
            .required(),
        permissions: Joi.array()
            .required()
    },
);

const paramsValidationSchema = Joi.object({
    groupId: Joi.string()
        .required()
});

export const groupCreationValidation = validator.body(groupCreatioinValidationSchema);
export const groupsParamsValidation = validator.params(paramsValidationSchema);

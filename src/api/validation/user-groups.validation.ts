import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

const usersToGroupCreatioinValidationSchema = Joi.object(
    {
        groupId: Joi.string()
            .required(),
        usersIds: Joi.array()
            .required()
    },
);

export const usersToGroupCreatioinValidation = validator.body(usersToGroupCreatioinValidationSchema);

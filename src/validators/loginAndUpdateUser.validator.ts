import joi from 'joi';

import { validatorErrorMessages } from '../constants';
import { IUser } from '../entity';

export const loginAndUpdateUserValidator: joi.ObjectSchema<Partial<IUser>> = joi.object({
    email: joi.string()
        .email()
        .trim(true)
        .required()
        .messages({
            'string:email': `${validatorErrorMessages.notValid}`,
        }),
    password: joi.string()
        .min(8)
        .max(25)
        .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .required()
        .messages({
            'string:pattern.base': `${validatorErrorMessages.notValid}`,
        }),
});

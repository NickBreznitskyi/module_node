import joi from 'joi';

import { IUser } from '../entity';
import { validatorErrorMessages } from '../constants';

export const userValidator: joi.ObjectSchema<Partial<IUser>> = joi.object({
    firstName: joi.string()
        .alphanum()
        .min(3)
        .max(25)
        .trim(true)
        .required()
        .messages({
            'string.empty': validatorErrorMessages.stringEmpty,
            'string.min': validatorErrorMessages.stringMin,
            'string.max': validatorErrorMessages.stringMax,
        }),
    lastName: joi.string()
        .alphanum()
        .min(3)
        .max(25)
        .trim(true)
        .required()
        .messages({
            'string.empty': validatorErrorMessages.stringEmpty,
            'string.min': validatorErrorMessages.stringMin,
            'string.max': validatorErrorMessages.stringMax,
        }),
    age: joi.number()
        .min(0)
        .max(120)
        .message(`Age ${validatorErrorMessages.notValid}`),
    phone: joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
            'string.pattern.base': `Phone ${validatorErrorMessages.notValid}`,
        }),
    email: joi.string()
        .email()
        .trim(true)
        .required()
        .messages({
            'string.email': `Email ${validatorErrorMessages.notValid}`,
        }),
    password: joi.string()
        .min(8)
        .max(25)
        .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .required()
        .messages({
            'string.pattern.base': validatorErrorMessages.passwordMessage,
        }),
});

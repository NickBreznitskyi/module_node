import joi from 'joi';
import { IPost } from '../entity';
import { validatorErrorMessages } from '../constants';

export const postValidator: joi.ObjectSchema<Partial<IPost>> = joi.object({
    title: joi.string()
        .min(1)
        .max(255)
        .required()
        .messages({
            'string.empty': validatorErrorMessages.stringEmpty,
            'string.max': validatorErrorMessages.stringMax,
        }),
    text: joi.string()
        .min(1)
        .max(255)
        .required()
        .messages({
            'string.empty': validatorErrorMessages.stringEmpty,
            'string.max': validatorErrorMessages.stringMax,
        }),
});

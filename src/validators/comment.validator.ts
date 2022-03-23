import joi from 'joi';

import { validatorErrorMessages } from '../constants';
import { IComment } from '../entity';

export const commentValidator: joi.ObjectSchema<Partial<IComment>> = joi.object({
    text: joi.string()
        .min(1)
        .max(255)
        .required()
        .messages({
            'string.empty': validatorErrorMessages.stringEmpty,
            'string.max': validatorErrorMessages.stringMax,
        }),
});

import { Response, NextFunction } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories';
import { userValidator } from '../validators';

class UserMiddleware {
    public async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const userFromDb = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDb) {
                res.status(404).json('User not found');
                return;
            }

            req.user = userFromDb;
            next();
        } catch (e: any) {
            res.status(400)
                .json(e);
        }
    }

    public validation(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {
                firstName, lastName, age, phone, email, password,
            } = req.body;

            const payload = {
                firstName,
                lastName,
                age,
                phone,
                email,
                password,
            };

            const { error } = userValidator.validate(payload);

            if (error) {
                throw new Error(`Error in User Data : ${error.message}`);
            }

            next();
        } catch (e: any) {
            res.status(406)
                .json(e.message);
        }
    }
}

export const userMiddleware = new UserMiddleware();

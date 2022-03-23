import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { userService } from '../services';
import { loginAndUpdateUserValidator, registrationValidator } from '../validators';

class UserMiddleware {
    public async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const userFromDb = await userService.getUserByEmail(req.body.email);

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

    public async checkUserByParams(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            if (+req.params.id !== req.user?.id) {
                res.status(403).json('Forbidden');
            }
            next();
        } catch (e: any) {
            res.status(400)
                .json(e);
        }
    }

    public checkConfirmPassword(req: IRequestExtended, res: Response, next: NextFunction): void | Error {
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        next();
    }

    public registrationValidator(req: IRequestExtended, res: Response, next: NextFunction): void | Error {
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

            const { error } = registrationValidator.validate(payload);

            if (error) {
                throw new Error(`Error in User Data : ${error.message}`);
            }

            next();
        } catch (e: any) {
            res.status(406)
                .json(e.message);
        }
    }

    public loginValidator(req:IRequestExtended, res: Response, next: NextFunction): void | Error {
        try {
            const { email, password } = req.body;

            const payload = {
                email,
                password,
            };

            const { error } = loginAndUpdateUserValidator.validate(payload);

            if (error) {
                throw new Error(`${error.message}`);
            }

            next();
        } catch (e: any) {
            res.status(406)
                .json(e.message);
        }
    }
}

export const userMiddleware = new UserMiddleware();

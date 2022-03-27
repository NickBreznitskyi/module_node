import { NextFunction, Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';

import { IUser } from '../entity';
import { IRequestExtended } from '../interfaces';
import { emailService, userService } from '../services';
import { emailActionEnum } from '../constants';
import { userRepository } from '../repositories';

class UserController {
    public async getUsers(req:Request, res: Response, next: NextFunction): Promise<Response<IUser[] | Error> | undefined> {
        try {
            const users = await userService.getUsers();
            return res.json(users);
        } catch (e: any) {
            next(e);
        }
    }

    public async getUserByEmail(req:Request, res:Response, next: NextFunction): Promise<Response<IUser | Error> | undefined> {
        try {
            const { email } = req.body;
            const user = await userService.getUserByEmail(email);
            return res.json(user);
        } catch (e: any) {
            next(e);
        }
    }

    public async updateUser(req: IRequestExtended, res: Response, next: NextFunction): Promise<Response<UpdateResult | Error> | undefined> {
        try {
            const {
                password,
                email,
            } = req.body;
            const { id } = req.params;
            const updatedUser = await userService.updateUser(id, password);
            await emailService.sendMail(email, emailActionEnum.CHANGE_PASSWORD);
            return res.json(updatedUser);
        } catch (e: any) {
            next(e);
        }
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response<DeleteResult | Error> | undefined> {
        try {
            const { id } = req.params;
            const user = await userRepository.getUserByParams({ id: +id });
            await emailService.sendMail(user?.email as string, emailActionEnum.ACCOUNT_DELETE);
            const deletedUser = await userService.deleteUser(id);
            return res.json(deletedUser);
        } catch (e: any) {
            next(e);
        }
    }
}

export const userController = new UserController();

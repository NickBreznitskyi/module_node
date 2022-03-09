import { DeleteResult, UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { IUser } from '../entity/user.entity';
import { userRepository } from '../repositories/user/user.repository';

class UserService {
    public async getUsers(): Promise<IUser[]> {
        return userRepository.getUsers();
    }

    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        return userRepository.createUser(dataToSave);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async updateUser(id: string, password: string, email: string):
        Promise<UpdateResult> {
        return userRepository.updateUser(+id, password, email);
    }

    public async deleteUser(id: string): Promise<DeleteResult> {
        return userRepository.deleteUser(+id);
    }

    private _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();

import { userService } from './user.service';
import { IUser } from '../entity/user.entity';
import { tokenService } from './token.service';
import { IToken } from '../entity/token.entity';

class AuthService {
    public async registration(body: IUser): Promise<IToken> {
        const { email } = body;

        const user = await userService.getUserByEmail(email);
        if (user) {
            throw new Error(`User with this email: ${email} already exist`);
        }
        const createdUser = await userService.createUser(body);
        return this._getTokenData(createdUser);
    }

    private async _getTokenData(userData: IUser): Promise<IToken> {
        const { id, email, role } = userData;
        const tokensPair = await tokenService.generateTokenPair({ id, email, role });
        await tokenService.saveToken(id, tokensPair.refreshToken);

        return {
            ...tokensPair,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();

import jwt from 'jsonwebtoken';

import { config } from '../config/config';
import { IToken } from '../entity/token.entity';
import { tokenRepository } from '../repositories/token/token.repository';

interface IPayload {
    id: number;
    email:string;
    role: string;
}

interface ITokenPair {
    accessToken: string;
    refreshToken: string;
}

class TokenService {
    public async generateTokenPair(payload: IPayload): Promise<ITokenPair> {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, config.SECRET_REFRESH_KEY as string, { expiresIn: '1d' });

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId: number, refreshToken: string): Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenByUserId(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDb);
        }

        return tokenRepository.createToken({ refreshToken, userId });
    }
}

export const tokenService = new TokenService();

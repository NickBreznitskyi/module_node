import { getManager, Repository } from 'typeorm';

import { IToken, Token } from '../../entity/token.entity';
import { ITokenRepository } from './token.repository.interface';

class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async createToken(token: IToken): Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public async findTokenByUserId(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }
}

export const tokenRepository = new TokenRepository();

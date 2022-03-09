import { IToken } from '../../entity/token.entity';

export interface ITokenRepository {
    createToken(token: any): Promise<IToken>;
    findTokenByUserId(userId: number): Promise<IToken | undefined>;
}

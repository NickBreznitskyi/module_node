import {
    Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';

export interface IToken {
    id?: number;
    userId: number;
    refreshToken: string;
}

@Entity('Tokens', { database: 'okten' })
export class Token implements IToken {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        refreshToken: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}

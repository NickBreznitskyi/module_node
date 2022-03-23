import { NextFunction, Response } from 'express';

import { IUser } from '../entity';
import { IRequestExtended } from '../interfaces';
import { postService } from '../services';
import { postValidator } from '../validators';

class PostMiddleware {
    public postValidator(req: IRequestExtended, res: Response, next: NextFunction): void | Error {
        try {
            const {
                title, text,
            } = req.body;

            const payload = {
                text,
                title,
            };

            const { error } = postValidator.validate(payload);

            if (error) {
                throw new Error(`Error in Post Data : ${error.message}`);
            }

            next();
        } catch (e: any) {
            res.status(406)
                .json(e.message);
        }
    }

    public async verifyUserPost(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { postId } = req.params;
            const { id } = req.user as IUser;

            const userPost = await postService.getUserPostByParams({ id: +postId, userId: id });

            if (!userPost) {
                res.status(404).json('Post not found');
                return;
            }

            next();
        } catch (e: any) {
            res.status(400)
                .json(e);
        }
    }
}

export const postMiddleware = new PostMiddleware();

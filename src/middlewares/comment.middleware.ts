import { NextFunction, Response } from 'express';

import { actionType } from '../constants';
import { IRequestExtended } from '../interfaces';
import { postService } from '../services';
import { commentValidator } from '../validators';

class CommentMiddleware {
    public commentValidator(req: IRequestExtended, res: Response, next: NextFunction): void | Error {
        try {
            const {
                text,
            } = req.body;

            const payload = {
                text,
            };

            const { error } = commentValidator.validate(payload);

            if (error) {
                throw new Error(`Error in Comment Data : ${error.message}`);
            }

            next();
        } catch (e: any) {
            res.status(406)
                .json(e.message);
        }
    }

    public async checkIsPostExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { postId } = req.params;

            const userPost = await postService.getUserPostByParams({ id: +postId });

            if (!userPost) {
                res.status(404)
                    .json('Post not found');
                return;
            }

            next();
        } catch (e: any) {
            res.status(400)
                .json(e);
        }
    }

    public verifyActionType(req: IRequestExtended, res: Response, next: NextFunction): void | Error {
        try {
            const { action } = req.body;

            if (!action) {
                throw new Error('No action');
            }

            if (action !== actionType.TYPE_LIKE || action !== actionType.TYPE_DISLIKE) {
                throw new Error('Action type not valid');
            }

            next();
        } catch (e: any) {
            res.status(400)
                .json(e);
        }
    }
}

export const commentMiddleware = new CommentMiddleware();

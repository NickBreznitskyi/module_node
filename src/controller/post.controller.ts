import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { IPost } from '../entity';
import { IRequestExtended } from '../interfaces';
import { postService } from '../services';

class PostController {
    public async createPost(req: IRequestExtended, res: Response): Promise<Response<IPost>> {
        const post = {
            ...req.body,
            userId: req.user?.id,
        };
        const createdPost = await postService.createPost(post);
        return res.json(createdPost);
    }

    public async getUserPosts(req: Request, res: Response): Promise<Response<IPost[]>> {
        const { userId } = req.params;
        const posts = await postService.getUserPosts(userId);
        return res.json(posts);
    }

    public async updatePost(req: Request, res: Response): Promise<Response<UpdateResult>> {
        const {
            title,
            text,
        } = req.body;
        const { postId } = req.params;
        const updatedPost = await postService.updatePost(postId, title, text);
        return res.json(updatedPost);
    }
}

export const postController = new PostController();

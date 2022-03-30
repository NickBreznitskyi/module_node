import { Router } from 'express';

import { userController } from '../controller';
import { authMiddleware, tokenTypeMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.get('/', userController.getUsers);
router.patch(
    '/:id',
    userMiddleware.passwordValidator,
    userMiddleware.checkConfirmPassword,
    tokenTypeMiddleware.tokenTypeAction,
    authMiddleware.checkToken,
    userMiddleware.checkUserByParams,
    userController.updateUser,
);
router.delete(
    '/:id',
    tokenTypeMiddleware.tokenTypeAccess,
    authMiddleware.checkToken,
    userMiddleware.checkUserByParams,
    userController.deleteUser,
);

export const userRouter = router;

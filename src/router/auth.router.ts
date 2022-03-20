import { Router } from 'express';

import { authController } from '../controller';
import { authMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login', userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkToken, authController.logout);
router.post('/refresh', authMiddleware.checkToken, authController.refresh);

export const authRouter = router;

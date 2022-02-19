const {Router} = require('express');
const UserController = require('../controllers/user.controller');
const userMiddleware = require('../middleware/isValidId');

const userRouter = Router();

userRouter.get('/', UserController.renderUsers);
userRouter.get('/:userId',userMiddleware, UserController.getUserById);

module.exports = userRouter;
const {Router} = require('express');
const SignInController = require('../controllers/signIn.controller');
const signInMiddleware = require("../middleware/isSignInValid");

const signInRouter = Router();

signInRouter.get('/', SignInController.renderSignIn);
signInRouter.post('/', signInMiddleware, SignInController.signInUser);

module.exports = signInRouter;
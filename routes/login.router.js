const {Router} = require('express');
const LoginController = require('../controllers/login.controller');
const loginMiddleware = require('../middleware/isLoginValid');

const loginRouter = Router();

loginRouter.get('/', LoginController.renderLogin);
loginRouter.post('/', loginMiddleware, LoginController.loginUser);

module.exports = loginRouter;
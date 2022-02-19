const users = require("../db/usersArray");

class SignInController {
    renderSignIn(req, res) {
        res.render('signIn');
    }

    signInUser(req, res) {
        const findUser = users.find(user => user.email === req.body.email && user.password === req.body.password);
        res.redirect(`/users/${findUser.id}`);
    }
}

module.exports = new SignInController();
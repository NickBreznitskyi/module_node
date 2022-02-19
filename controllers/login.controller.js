const users = require("../db/usersArray");

class LoginController {
    renderLogin(req, res) {
        res.render('login');
    }

    loginUser(req, res) {
        users.push({...req.body, id: users.length ? users[users.length - 1].id + 1 : 1});
        res.redirect('/users');
    }
}

module.exports = new LoginController();
const userFilter = require("../helper");
const users = require("../db/usersArray");

class UserController {
    renderUsers(req, res) {
        const {age, city} = req.query;
        const filteredUsers = userFilter(age, city);
        res.render('users', {users: filteredUsers});
    }

    getUserById(req, res) {
        const user = users.find(user => user.id === +req.params.userId);
        res.render('user', {user});
    }
}

module.exports = new UserController();
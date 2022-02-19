const users = require("../db/usersArray");

const isSignInValid = (req, res, next) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            throw new Error('email or password is not provided!');
        }

        if (password.length < 6) {
            throw new Error('Not valid data');
        }

        if (!users.some(user => user.email === req.body.email)) {
            throw new Error('Not valid data');
        }

        const findUser = users.find(user => user.email === req.body.email && user.password === req.body.password);
        if (!findUser) {
            throw new Error("Not valid data");
        }

        next();
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

module.exports = isSignInValid;
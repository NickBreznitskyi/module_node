const users = require("../db/usersArray");

const isLoginValid = (req, res, next) => {
    try {
        const {firstName, lastName, email, password, age, city} = req.body;

        if (!firstName || !lastName || !email || !password || !age || !city) {
            throw new Error('Enter all data');
        }

        if (users.some(user => user.email === req.body.email)) {
            throw new Error('Not valid data');
        }

        if (password.length < 6) {
            throw new Error('Password length must be more then 6');
        }

        if (age < 1 || age > 200) {
            throw new Error('Not valid age');
        }

        next();
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

module.exports = isLoginValid;
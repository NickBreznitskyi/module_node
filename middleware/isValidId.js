const users = require("../db/usersArray");

const isValidId = (req, res, next) => {
    try {
        const user = users.find(user => user.id === +req.params.userId);
        if (!user) {
            throw new Error('the user with such id still is not present');
        }

        next();
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

module.exports = isValidId;
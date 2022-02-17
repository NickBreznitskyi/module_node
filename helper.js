const users = require("./usersArray");
const userFilter = (age, city) => {
    if (age && city) {
        return users.filter(user => user.age.toString() === age && user.city.toLowerCase() === city.toLowerCase());
    }
    if (age) {
        return users.filter(user => user.age.toString() === age);
    }
    if (city) {
        return users.filter(user => user.city.toLowerCase() === city.toLowerCase())
    }
    return users
}

module.exports = userFilter;
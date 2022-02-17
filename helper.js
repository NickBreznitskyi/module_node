const users = require("./usersArray");
const userFilter = (age, city) => {
    const usersFilter = [...users];
    if (age && city) {
        return usersFilter.filter(user => user.age.toString() === age && user.city.toLowerCase() === city.toLowerCase());
    }
    if (age) {
        return usersFilter.filter(user => user.age.toString() === age);
    }
    if (city) {
        return usersFilter.filter(user => user.city.toLowerCase() === city.toLowerCase())
    }
    return users
}

module.exports = userFilter;
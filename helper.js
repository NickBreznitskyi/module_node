const users = require("./db/usersArray");
const userFilter = (age, city) => {
    let usersFilter = [...users];
    if (age) {
        usersFilter = usersFilter.filter(user => user.age.toString() === age);
    }
    if (city) {
        usersFilter = usersFilter.filter(user => user.city.toLowerCase() === city.toLowerCase())
    }
    return usersFilter
}

module.exports = userFilter;

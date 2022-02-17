const express = require('express');
const {engine} = require('express-handlebars');
const path = require('path');
const users = require('./usersArray');
const userFilter = require('./helper');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.get('/login', ((req, res) => {
    res.render('login');
}))

app.get('/users', ((req, res) => {
    const {age, city} = req.query;
    const filteredUsers = userFilter(age, city);
    res.render('users', {users: filteredUsers});
}))

app.get('/error', ((req, res) => {
    res.render('error');
}))

app.get('/user/:userId', ((req, res) => {
    const {userId} = req.params;
    const user = users[userId - 1];
    res.render('user', {user})
}))

app.post('/login', ((req, res) => {
    if (users.filter(user => user.email === req.body.email).length > 0) {
        res.redirect('/error');
    } else {
        users.push(req.body);
        res.redirect('/users');
    }
}))

app.use(((req, res) => {
    res.render('notFound');
}))

app.listen(4000, () => {
    console.log('Serves has started on PORT 4000');
})


const fs = require("fs");
const path = require("path");

const onlineUsers = [
    {
        name: 'Andrii',
        age: 22,
        city: 'Lviv'
    },
    {
        name: 'Kolya',
        age: 21,
        city: 'Ternopil'
    },
    {
        name: 'Oleg',
        age: 19,
        city: 'Terebovlya'
    }
]

const inPersonUsers = [
    {
        name: 'Pavlo',
        age: 25,
        city: 'Cherkasy'
    },
    {
        name: 'Roman',
        age: 23,
        city: 'Lutsk'
    },
    {
        name: 'Nazar',
        age: 28,
        city: 'Odesa'
    }
]

fs.mkdir(path.join(__dirname, 'main'), (err) => {
    if (err) {
        console.log(err);
        throw err
    }
    fs.mkdir(path.join(__dirname, 'main', 'inPerson'), (err) => {
        if (err) {
            console.log(err);
            throw err
        }
        fs.mkdir(path.join(__dirname, 'main', 'online'), (err) => {
            if (err) {
                console.log(err);
                throw err
            }
            writeUsersTo('inPerson', inPersonUsers);
            writeUsersTo('online', onlineUsers);
            replace('inPerson', 'online');
            replace('online', 'inPerson');
        })

    })
})

const writeUsersTo = (directory, arrUsers) => {
    arrUsers.map(user => fs.writeFile(path.join(__dirname, 'main', `${directory}`, `${user.name}.txt`), `Name: ${user.name}\nAge: ${user.age}\nCity: ${user.city}`, (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
    }))
}

const replace = (fromDir, toDir) => {
    fs.readdir(path.join(__dirname, 'main', `${fromDir}`), (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        data.map(file => {
            fs.rename(path.join(__dirname, 'main', `${fromDir}`, `${file}`), path.join(__dirname, 'main', `${toDir}`, `${file}`), (err) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            })
        })
    })
}


const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, 'main', 'online'), {recursive: true}, (err) => {
    if (err) {
        console.log(err);
        throw err
    }
    fs.mkdir(path.join(__dirname, 'main', 'inPerson'), (err) => {
        if (err) {
            console.log(err);
            throw err
        }
        fs.writeFile(path.join(__dirname, 'main', 'online', 'online.txt'), onlineUsers.map(user => `NAME: ${user.name}\nAGE: ${user.age}\nCITY: ${user.city}\n`).toString(), (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
            fs.writeFile(path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'), inPersonUsers.map(user => `NAME: ${user.name}\nAGE: ${user.age}\nCITY: ${user.city}\n`).toString(), (err) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                replace()
            })
        })
    })
})

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



const replace = () => {
    fs.rename(path.join(__dirname, 'main', 'online', 'online.txt'), path.join(__dirname, 'main', 'inPerson', 'onlineSwitch.txt'), (err,) => {
        if (err) {
            console.log(err);
            throw err
        }
        fs.rename(path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'), path.join(__dirname, 'main', 'online', 'inPersonSwitch.txt'), (err,) => {
            if (err) {
                console.log(err);
                throw err
            }
            fs.rename(path.join(__dirname, 'main', 'inPerson', 'onlineSwitch.txt'), path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'), (err,) => {
                if (err) {
                    console.log(err);
                    throw err
                }
                fs.rename(path.join(__dirname, 'main', 'online', 'inPersonSwitch.txt'), path.join(__dirname, 'main', 'online', 'online.txt'), (err,) => {
                    if (err) {
                        console.log(err);
                        throw err
                    }
                })
            })
        })
    })



}


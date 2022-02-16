const fs = require("fs");
const path = require("path");

//////////////////////////////////////

fs.writeFile(path.join(__dirname, 'task1.txt'), 'qwerty', (err) => {
    if (err) {
        console.log(err);
        throw err
    }
    fs.readFile(path.join(__dirname, 'task1.txt'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            throw err
        }
        fs.writeFile(path.join(__dirname, 'newTask1.txt'), data, (err) => {
            if (err) {
                console.log(err);
                throw err
            }
        })
    })
})


////////////////////////////////////

fs.writeFile(path.join(__dirname, 'task2.txt'), '2370545473', (err) => {
    if (err) {
        console.log(err);
        throw err
    }
    fs.mkdir(path.join(__dirname, 'task2'), (err) => {
        if (err) {
            console.log(err);
            throw err
        }
        fs.readFile(path.join(__dirname, 'task2.txt'), 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                throw err
            }
            fs.writeFile(path.join(__dirname, 'task2', 'newTask2'), data, (err) => {
                if (err) {
                    console.log(err);
                    throw err
                }
                fs.unlink(path.join(__dirname, 'task2.txt'), (err) => {
                    if (err) {
                        console.log(err);
                        throw err
                    }
                })
            })
        })
    })
})

///////////////////////////////////

fs.mkdir(path.join(__dirname, 'task3'), (err) => {
    if (err) {
        console.log(err);
        throw err
    }
    for (let i = 0; i < 3; i++) {
        fs.mkdir(path.join(__dirname, 'task3', `subDir${i}`), (err) => {
            if (err) {
                console.log(err);
                throw err
            }
            fs.writeFile(path.join(__dirname, 'task3', `subFile${i}.txt`), `${i}`, (err) => {
                if (err) {
                    console.log(err);
                    throw err
                }
            })
        })
    }
    task3()
})


const task3 = () => {
    fs.readdir(path.join(__dirname, 'task3'), (err, data) => {
        if (err) {
            console.log(err);
            throw err
        }
        for (const item of data) {
            if (item.split('.').length < 2) {
                fs.rename(path.join(__dirname, 'task3', item), path.join(__dirname, 'task3', `_new${item}`), (err) => {
                    if (err) {
                        console.log(err);
                        throw err
                    }
                })
            } else {
                fs.truncate(path.join(__dirname, 'task3', `${item}`), (err) => {
                    if (err) {
                        console.log(err);
                        throw err
                    }
                })
            }
        }
    })
}

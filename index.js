const express = require('express');
const  sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db.sqlite');
const router = express.Router();






/*
   db.run('DELETE FROM list WHERE id IS 1');
*/

const checkAdmin = (req, res, next) => {
    if (req.query.name !== process.env.PASS_VAR) {
        return res.send('Unauthorized');
    }
    next();
}

router.get('/list', checkAdmin, (req, res, next) => {
    try {
    db.all('SELECT * FROM list', (err, rows) => {
        console.log(err);
        res.send(rows);
    })
} catch (err) {
    console.log(err);
}
});

//get list by user
router.get('/list/:id', (req, res, next) => {
let id = req.params.id;
    const sql = `SELECT * FROM list WHERE id = ?`;
    db.all(sql, id, (err, rows) => {
        if (err) {
            console.log(err)
        } else {

            res.send(rows);
        }
    })
});
//save list on current user
router.post('/items', (req, res, next) => {
    console.log(req.method + ' Received!');
    let id = req.body.username;
    let item = req.body.name;
    let items = req.body.items;

        db.run('INSERT INTO list (id, name, items) VALUES(?, ?, ?)',id ,item, items, (err) => {
            if (err) {
                console.log(err);
            }
    res.status(201).send();
})
    });

//delete list from user
router.post('/list/delete/:id', (req, res, next) => {
    res.send({message: ' Deleted'});
    console.log(req.method + 'Deleted')
    const id = req.params.id;
    const sql = 'DELETE FROM list WHERE id = ?';
    db.run(sql, id, err => {
        if (err) {
            console.log(err);
        }
    })
});
    

router.post('/users/register', async (req, res, next) => {

});
   
        

   

router.post('/users/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    db.all('SELECT * FROM users WHERE username = ? AND password = ?', username, password, (err, row) => {
        if (err) {
            res.send({err: err});
        } 

        

         if (row.length > 0) {
                res.send(row);
            } else {
                res.send({message: 'Wrong username or password'});
            }
        })
})

router.delete('/items/:name', (req, res, next) => {
   console.log(req.params.name + ' Deleted');
   list = list.filter(obj => req.params.name !== obj.name);
   res.status(200).send();
});

module.exports = router;
var express = require('express');
var router = express.Router();
var mongodb = require('../config/database')

/* /auth */
router.get('/', function(req, res, next) {
    res.redirect('/')
});

router.post('/signup', (req, res) => {
    let { name, username, email, password, repeatPassword, agree } = req.body
    if (!name || !username || !email || !password || !repeatPassword || !agree) {
        let err = "Fill all data"
        return res.redirect('/signup')
    }

    if (password != repeatPassword) {
        return res.redirect('/signup')
    }

    // express js
    mongodb.connect().then(db => {
        db.collection('accounts').find({ username: username }).toArray((err, data) => {
            if (data.length > 0) {
                return res.redirect('/signup')
            } else {
                db.collection('accounts').insertOne(req.body)
                return res.redirect('/signin')
            }
        })
    })
})

module.exports = router;
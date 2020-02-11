var express = require('express');
var router = express.Router();
let mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
        createdDate: Date,
        name: String,
        username: String,
        email: String,
        password: String
    })
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
    try {
        const account = mongoose.model('Accounts', accountSchema)

        let accountx = new account({
            createdDate: new Date(),
            name,
            username,
            email,
            password
        })

        account.findOne({ $or: [{ username }, { email }] }).exec((err, result) => {
            if (result) {
                res.redirect('/signup')
            } else {
                accountx.save(err => {
                    if (err) return console.log(err);
                    console.log("sukses");
                })
                res.redirect('/signin')
            }
        })
    } catch (e) {
        console.log(e);
    }
})

router.post('/signin', (req, res) => {
    let { username, password } = req.body
    let account = mongoose.model('Accounts', accountSchema)
    account.findOne({ username, password }, (err, result) => {
        if (result) {
            req.session.login = true
            res.send('Login berhasil: Session tergenerated ' + req.session.cookie.maxAge)
            console.log("Login berhasil");
        } else {
            res.send("Login gagal")
            console.log("Login gagal");
        }
    })
})

module.exports = router;
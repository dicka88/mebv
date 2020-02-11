var express = require('express');
var router = express.Router();

/* GET home pagex. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'MEVB' });
});

router.get('/signin', function(req, res, next) {
    res.render('signin', { title: 'Signin | Express Data' });
    console.log(req.session);

});

router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Register | Express Data' });
});

router.get('/input', function(req, res, next) {
    res.render('input', { title: 'Input | Express Data' });
});

router.get('/list', function(req, res, next) {
    res.render('list', { title: 'List | Express Data' });
});

module.exports = router;
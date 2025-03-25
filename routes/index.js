const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
 //#swagger.tags = ['Hello World']
 res.send('Hello World')
});
router.use('/users', require('./users'));
router.use('/products', require('./products'));


router.get('/login', passport.authenticate('github'), (req, res) => {
  //#swagger.tags = ['Authentication']
  //#swagger.summary = 'Redirect to GitHub Authentication'
  //#swagger.description = 'Click <a href="/login">here</a> to authenticate with GitHub.'
});

router.get('/logout', function(req, res, next) {
  //#swagger.tags = ['Authentication']
  //#swagger.summary = 'Logout User'
  //#swagger.description = 'Click <a href="/logout">here</a> to log out and return to the homepage.'

  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
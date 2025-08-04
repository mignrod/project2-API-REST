const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

// router.get('/', (req, res) => {
//   res.send('API is working');
// });

router.use('/users', require('./users'));

router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/api-docs');
  }
);

module.exports = router;

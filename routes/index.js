const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('API is working');
});

router.use('/users', require('./users'));

module.exports = router;

const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  res.send('API is working');
});

router.use('/users', require('./users'));
router.use('/tasks', require('./tasks'));

module.exports = router;

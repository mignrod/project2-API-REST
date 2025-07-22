const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('API is working');
});

router.use('/tasks', require('./tasks'));

module.exports = router;

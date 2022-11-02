var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('flights', { title: 'Search Results Flights' });
});

module.exports = router;

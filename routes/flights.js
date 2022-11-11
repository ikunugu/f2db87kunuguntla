// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('flights', { title: 'Search Results Flights' });
// });

// module.exports = router;
var express = require('express');
const flight_controlers= require('../controllers/flight');
var router = express.Router();
/* GET flights */
router.get('/', flight_controlers.flight_view_all_Page );
// GET request for one costume.
router.get('flight/:id', flight_controlers.flight_detail);
module.exports = router;
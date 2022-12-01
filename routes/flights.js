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

/* GET detail costume page */
router.get('/detail',secured, flight_controlers.flight_view_one_Page);

/* GET create costume page */
router.get('/create',secured, flight_controlers.flight_create_Page);

/* GET create update page */
router.get('/update',secured, flight_controlers.flight_update_Page);

/* GET delete costume page */
router.get('/delete',secured, flight_controlers.flight_delete_Page);




module.exports = router;
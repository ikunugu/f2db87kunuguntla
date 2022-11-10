var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var flight_controller = require('../controllers/flight');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// flight ROUTES ///
// POST request for creating a flight.
router.post('/flights', flight_controller.flight_create_post);
// DELETE request to delete flight.
router.delete('/flights/:id', flight_controller.flight_delete);
// PUT request to update flight.
router.put('/flights/:id', flight_controller.flight_update_put);
// GET request for one flight.
router.get('/flights/:id', flight_controller.flight_detail);
// GET request for list of all flight items.
router.get('/flights', flight_controller.flight_list);
module.exports = router;
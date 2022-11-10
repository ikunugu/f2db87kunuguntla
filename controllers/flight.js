var Flight = require('../models/flight');
// List of all flights
exports.flight_list = async function(req, res) {
    try{
    theFlights = await Flight.find();
    res.send(theFlights);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
// for a specific flight.
exports.flight_detail = function(req, res) {
 res.send('NOT IMPLEMENTED: flight detail: ' + req.params.id);
};
// Handle flight create on POST.
exports.flight_create_post = function(req, res) {
 res.send('NOT IMPLEMENTED: flight create POST');
};
// Handle flight delete form on DELETE.
exports.flight_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: flight delete DELETE ' + req.params.id);
};
// Handle flight update form on PUT.
exports.flight_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: flight update PUT' + req.params.id);
};
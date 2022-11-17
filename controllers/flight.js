var Flight = require('../models/flight');
// List of all flights
exports.flight_list = async function (req, res) {
    try {
        theFlights = await Flight.find();
        res.send(theFlights);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific flight.
exports.flight_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Flight.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
    //res.send('NOT IMPLEMENTED: flight detail: ' + req.params.id);
};
// Handle Flight create on POST.
exports.flight_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Flight();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"flight_type":"goat", "cost":12, "size":"large"}
    document.flightName = req.body.flightName;
    document.flightType = req.body.flightType;
    document.price = req.body.price;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle flight delete form on DELETE.
//exports.flight_delete = function(req, res) {
//res.send('NOT IMPLEMENTED: flight delete DELETE ' + req.params.id);
// Handle flight delete on DELETE.
exports.flight_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Flight.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle flight update form on PUT.
exports.flight_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body 
    ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Flight.findById(req.params.id)
        // Do updates of properties 
        if (req.body.flightType)
            toUpdate.flightType = req.body.flightType;
        if (req.body.flightName) toUpdate.flightName = req.body.flightName;
        if (req.body.price) toUpdate.price = req.body.price;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
    failed`);
    }

    //res.send('NOT IMPLEMENTED: flight update PUT' + req.params.id);
};


// VIEWS
// Handle a show all view
exports.flight_view_all_Page = async function (req, res) {
    try {
        theFlights = await Flight.find();
        res.render('flights', { title: 'Flights Search Results', results: theFlights });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.flight_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await Flight.findById(req.query.id)
        res.render('flightdetail',
            { title: 'flight Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a flight.
// No body, no in path parameter, no query.
// Does not need to be async
exports.flight_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('flightcreate', { title: 'Flight Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

// Handle building the view for updating a flight.
// query provides the id
exports.flight_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await Flight.findById(req.query.id)
    res.render('flightupdate', { title: 'Flight Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

// Handle a delete one view with id from query
exports.flight_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await Flight.findById(req.query.id)
    res.render('flightdelete', { title: 'Flight Delete', toShow:
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
const location = require('../controllers/locationController');

module.exports = (app) => {

    app
    .route('/locations')
    .post(location.createLocation)
    .get(location.allLocations);

    app
    .route('/locations/:locationId')
    .get(location.retrieveLocation)
    .put(location.updateLocation)
    .delete(location.deleteLocation);

}
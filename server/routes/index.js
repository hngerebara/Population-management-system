const location = require('../controllers/locationController'),
    subLocation = require('../controllers/subLocationController');

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

    app
    .route('/locations/:locationId/sub')
    .post(subLocation.createSubLocation)
    .get(subLocation.allSubLocations);

    app
    .route('/locations/:locationId/sub/:subId')
    .get(subLocation.retrieveSubLocation)
    .put(subLocation.updateSubLocation)
    .delete(subLocation.deleteSubLocation);

}
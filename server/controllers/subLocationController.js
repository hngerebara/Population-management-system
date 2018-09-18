const SubLocation = require('../models/subLocationModel'),
    Location = require('../models/locationModel');

module.exports = {
   
    async createSubLocation(req, res) {
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({message: 'Body cannot be empty'});
        }

        req.body.totalPopulation = req.body.femalePopulation + req.body.malePopulation;
        req.body.parentLocation = req.params.locationId;
        try{
 
            let subLocation =  new SubLocation(req.body);

            let savedLocation = await subLocation.save();
            let location = await Location.findById(req.params.locationId);

            location.locations.push(savedLocation);
            location.save();
            return res.status(201).json(location);

        }catch(ex){
            switch(ex.code){
                case 11000:
                    return res.status(404).json({message: "Location name already exists"});
                default:
                    return res.status(400).json(ex);
           }   
        } 
    },

    async allSubLocations(req, res) {
        try{
            let subLocations = await SubLocation.find({parentLocation: req.params.locationId});
            if (!subLocations) return res.status(404).json({message: 'No Sub Locations found'}); 
        
            return res.status(200).json(subLocations);
        } catch(ex) {
             return res.status(400).json(ex);
        }
    },

    async retrieveSubLocation(req, res) {
        try{
            let subLocations = await SubLocation.findById(req.params.subId);

            if (!subLocations) return res.status(404).json({message: 'Sub Location Not Found', });
            
            return res.status(200).json(subLocations);

        }catch(ex){
            return res.status(400).json(ex);
        }
    },

    async updateSubLocation(req, res) {

        try {
            let subLocation =  await SubLocation.findById(req.params.subId);

            if (!subLocation) return res.status(404).json({message: 'Location Not Found'});

            subLocation.name = req.body.name;
            subLocation.malePopulation = req.body.malePopulation;
            subLocation.femalePopulation = req.body.femalePopulation;
            subLocation.totalPopulation = req.body.femalePopulation + req.body.malePopulation;

            let updatedLocation = await subLocation.save();
            return res.status(200).json(updatedLocation);
        
        }catch(ex) {
            switch(ex.code){
                case 11000:
                    return res.status(404).json({message: "Sub Location name already exists"});
                default:
                    return res.status(400).json(ex);
           }
        };
    },

    async deleteSubLocation(req, res) {
        try{
            let subLocation =  await SubLocation.findById(req.params.subId)
            
            if (!subLocation) return res.status(404).json({message: 'Sub Location Not Found', });
            await subLocation.remove();
            return res.status(200).json({message: `Successfully deleted location with id ${req.params.subId}`});
        
        }catch(ex){
            return res.status(400).json(ex);
        } 
    },   
};

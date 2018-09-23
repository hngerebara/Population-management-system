const Location = require('../models/locationModel');


module.exports = {
    async createLocation(req, res) {
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({message: 'Body cannot be empty'});
        }
        if(req.body.name == undefined){
            return res.status(400).json({message: `Name is required`}); 
        }
        if(req.body.malePopulation == undefined || req.body.femalePopulation == undefined){
            return res.status(400).json({message: `${req.body.malePopulation? 'Male ' : 'Female'} population is required`}); 
        }
        if(req.body.name.length < 3){
            return res.status(400).json({message: 'Location name is too short'}); 
        }
        let isExist = await Location.find({name: req.body.name});
        if(isExist && isExist.length){
            return res.status(400).json({message: "Location name already exists"});
        }

        try{
            
            req.body.totalPopulation = req.body.femalePopulation + req.body.malePopulation;   
            
            let location =  new Location(req.body);

            let savedLocation = await location.save();
            return res.status(201).json(savedLocation);

        }catch(ex){
            return res.status(400).json(ex);
        } 
    },

    async allLocations(req, res) {
        try{
            let locations = await Location.find({});
            // console.log(locations, "=============")

            //Sum all population

            if (!locations) return res.status(404).json({message: 'No location found'}); 
        
            return res.status(200).json(locations);
        } catch(ex) {
            
             return res.status(400).json(ex);
        }
    },

    async retrieveLocation(req, res) {
        try{
            let location = await Location.findById(req.params.locationId);

            if (!location) return res.status(404).json({message: 'Location Not Found', });
            
            if(location.locations && location.locations.length){
                location.totalPopulation = location.locations.reduce((acc, subPopulation) => {
                    return acc + subPopulation.totalPopulation;
                  }, 0) + location.malePopulation + location.femalePopulation;
            } else {
                location.totalPopulation = location.malePopulation + location.femalePopulation;
            } 
            return res.status(200).json(location);

        }catch(ex){
            return res.status(400).json(ex);
        }
    },

    async updateLocation(req, res) {

        try {
            let location =  await Location.findById(req.params.locationId);

            if (!location) return res.status(404).json({message: 'Location Not Found'});

            location.name = req.body.name;
            location.malePopulation = req.body.malePopulation;
            location.femalePopulation = req.body.femalePopulation;

            let updatedLocation = await location.save();
            return res.status(200).json(updatedLocation);
        
        }catch(ex) {
            switch(ex.code){
                case 11000:
                    return res.status(404).json({message: "Location name already exists"});
                default:
                    return res.status(400).json(ex);
           }
        };
    },

    async deleteLocation(req, res) {
        try{
            let location =  await Location.findById(req.params.locationId);
            
            if (!location) return res.status(404).json({message: 'Location Not Found', });
            await location.remove(); 

            return res.status(200).json({message: `Successfully deleted location with id ${req.params.locationId}`});
        
        }catch(ex){
            return res.status(400).json(ex);
        } 
    },   
};

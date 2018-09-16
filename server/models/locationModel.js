const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const subLocationSchema =  new Schema({
    name: {
        type: String,
        required: [true, "Location name is required"],
        unique: true
    },
    malePopulation: {
        type: Number,
        required: true,
        validate : {
            validator : Number.isInteger,
            message   : 'Male population must be an integer'
        }
    },
    femalePopulation: {
        type: Number,
        required: true,
        validate : {
            validator : Number.isInteger,
            message   : 'Female population must be an integer'
        }
    },
    createdAt: { 
        type: Date,
        default: new Date()
     },
    updatedAt: { 
        type: Date,
        default: new Date()
     },
});

const LocationSchema = new Schema({
    name: {
        type: String,
        required: [true, "Location name is required"],
        unique: true
    },
    malePopulation: {
        type: Number,
        required: true,
        validate : {
            validator : Number.isInteger,
            message   : 'Male population must be an integer'
        }
    },
    femalePopulation: {
        type: Number,
        required: true,
        validate : {
            validator : Number.isInteger,
            message   : 'Female population must be an integer'
        }
    },
    totalPopulation: {type: Number},
    locations: [subLocationSchema],
    createdAt: { 
        type: Date,
        default: new Date()
     },
    updatedAt: { 
        type: Date,
        default: new Date()
     },
});

const Location = mongoose.model('LocationSchema', LocationSchema);
module.exports = Location;

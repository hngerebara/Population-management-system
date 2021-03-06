const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
const LocationSchema =  new Schema({
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
    locations: [
        { type: Schema.Types.ObjectId, ref: 'SubLocation' }
    ],
    createdAt: { 
        type: Date,
        default: new Date()
     },
    updatedAt: { 
        type: Date,
        default: new Date()
     },
});

module.exports = mongoose.model('Location', LocationSchema);

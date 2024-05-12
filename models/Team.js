const mongoose = require("mongoose");
const Joi = require("joi"); // validation


// Defining a Mongoose schema for team members
const TeamSchema = new mongoose.Schema({
    id : {
        type: Number,
        required: true 
    },
    name:{
        type: String,  
        required: true,  // This means that the field is required and must be filled out before saving the document to MongoDB
        trim: true,  // Remove trailing spaces from the string
        minlength: 3,
        maxlength: 200
    },
    position:{
        type: String,  
        required: true,  // This means that the field is required and must be filled out before saving the document to MongoDB
        trim: true,  // Remove trailing spaces from the string
        minlength: 3,
        maxlength: 100
    },
    jobTime:{
        type: String,  
        required: true,  // This means that the field is required and must be filled out before saving the document to MongoDB
        trim: true,  // Remove trailing spaces from the string
        minlength: 3,
        maxlength: 100
    }
    
},{
    // create and update date 
    timestamps:true // Saves createdAt and updatedAt fields automatically
});


const Team = mongoose.model("Team", TeamSchema); // Model for team members

// validation function Create team member
function validateCreateTeam(obj) {
    const schema = Joi.object({
        id: Joi.number().required(),
        name: Joi.string().trim().min(3).max(100).required(),
        position: Joi.string().trim().min(3).max(100).required(),
        jobTime: Joi.string().trim().min(3).max(100).required()
    });

    return schema.validate(obj);
}

// validation function Update team member
function validateUpdateTeam(obj) {
    const schema = Joi.object({
        id: Joi.number(),
        name: Joi.string().trim().min(3).max(100),
        position: Joi.string().trim().min(3).max(200),
        jobTime: Joi.string().trim().min(3).max(200)
    });

    return schema.validate(obj);
}

module.exports={
    Team,
    validateCreateTeam,
    validateUpdateTeam
}  // Exporting the model
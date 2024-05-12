const mongoose = require("mongoose");
const Joi = require("joi"); // validation

// Defining a Mongoose schema for subscribers
const EmailSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true
    },
    email: {
        type: String,  
        required: true,  // This means that the field is required and must be filled out before saving the document to MongoDB
        //trim: true,  // Remove trailing spaces from the string
        minlength: 10,
        maxlength: 100
    }
},{
    // create and update date 
    timestamps:true // Saves createdAt and updatedAt fields automatically
});


const Email = mongoose.model("Email", EmailSchema); // Model for emails


// validation function Create new email
function validateCreateEmail(obj) {
    const schema = Joi.object({
        id : Joi.number().required(),
        email: Joi.string().trim().min(10).max(100).required()
    });

    return schema.validate(obj);
}

// validation function Update emails
function validateUpdateEmail(obj) {
    const schema = Joi.object({
        id : Joi.number(),
        email: Joi.string().trim().min(10).max(100)
    });

    return schema.validate(obj);
}

module.exports={
    Email,
    validateCreateEmail,
    validateUpdateEmail
}  // Exporting the model

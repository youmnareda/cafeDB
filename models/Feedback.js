const mongoose = require("mongoose");
const Joi = require("joi"); // validation

// Defining a Mongoose schema for subscribers
const FeedbackSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true,
    },
    email: {
        type: String,  
        required: true,  // This means that the field is required and must be filled out before saving the document to MongoDB
        //trim: true,  // Remove trailing spaces from the string
        minlength: 10,
        maxlength: 100
    },
    message : {
        type : String ,
        required : true
    }
},{
    // create and update date 
    timestamps:true // Saves createdAt and updatedAt fields automatically
});


const Feedback = mongoose.model("Feedback", FeedbackSchema); // Model for Feedback


// validation function Create new Feedback
function validateCreateFeedback(obj) {
    const schema = Joi.object({
        id : Joi.number().required(),
        name : Joi.string().min(3).max(100).required(),
        email: Joi.string().trim().min(10).max(100).required(),
        message : Joi.string().required()
    });

    return schema.validate(obj);
}

// validation function Update Feedback
function validateUpdateFeedback(obj) {
    const schema = Joi.object({
        id : Joi.number(),
        name : Joi.string().min(3),
        email: Joi.string().trim().min(10).max(100),
        message : Joi.string()
    });

    return schema.validate(obj);
}

module.exports={
    Feedback,
    validateCreateFeedback,
    validateUpdateFeedback
}  // Exporting the model

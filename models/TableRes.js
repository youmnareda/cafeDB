const mongoose = require("mongoose");
const Joi = require("joi"); // validation

// Defining a Mongoose schema for subscribers
const TableResSchema = new mongoose.Schema({
    id :{
        type :Number,
        required : true,
    } ,
    fullName :{
        type : String,
        required : true,
        minlength : 3,
        maxlength : 250
    } , 
    email :{
        type : String,
        required : true,
    } ,
    phone : {
        type : Number,
        required : true,
        maxlength : 11
    } ,
    date :{
        type : String,
        required : true,
    } ,
    time :{
        type : String,
        required : true,
    } ,
    person :{
        type : Number,
        required : true,
    } ,
    note : String ,
},{
    // create and update date 
    timestamps:true // Saves createdAt and updatedAt fields automatically
});


const TableRes = mongoose.model("TableReservation", TableResSchema); // Model for TableRes


// validation function Create new TableRes
function validateCreateTableRes(obj) {
    const schema = Joi.object({
        id : Joi.number().required(),
        fullName : Joi.string().min(3).max(250).required(),
        email: Joi.string().trim().required(),
        phone : Joi.number().required(),
        date : Joi.string().required(),
        time : Joi.string().required(),
        person : Joi.number().required(),
        note : Joi.string()
    });

    return schema.validate(obj);
}

// validation function Update TableRes
function validateUpdateTableRes(obj) {
    const schema = Joi.object({
        id : Joi.number(),
        fullName : Joi.string().min(3).max(250),
        email: Joi.string().trim(),
        phone : Joi.number(),
        date : Joi.string(),
        time : Joi.string(),
        person : Joi.number(),
        note : Joi.string()
    });

    return schema.validate(obj);
}

module.exports={
    TableRes,
    validateCreateTableRes,
    validateUpdateTableRes
}  // Exporting the model

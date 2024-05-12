/*const mongoose = require('mongoose');
const Joi = require('joi');
const { TableRes } = require('./TableRes');

const customerSchema = new mongoose.Schema({
    id :{
        type :Number,
        required : true,
    } ,
    name :{
        type : String,
        required : true
    } ,
    phone : {
        type : String,
        required : true,
    },
    email : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Email"
    },
    TableRes : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "TableRes"
    }
});
const Customer = new mongoose.model("Customer", customerSchema);

// validation function Create new Customer
function validateCreateCustomer(obj) {
    const schema = Joi.object({
        id : Joi.number().required(),
        name : Joi.string().required(),
        phone : Joi.number().required(),
        email : Joi.string().required(),
        TableRes : Joi.string()

    });

    return schema.validate(obj);
}

// validation function Update Customer
function validateUpdateCustomer(obj) {
    const schema = Joi.object({
        id : Joi.number(),
        name : Joi.string(),
        phone : Joi.number(),
        email : Joi.string(),
        TableRes : Joi.string()
    });

    return schema.validate(obj);
}

module.exports = {
    Customer,
    validateCreateCustomer,
    validateUpdateCustomer
}; */
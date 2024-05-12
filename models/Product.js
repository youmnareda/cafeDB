const mongoose = require("mongoose");
const Joi = require("joi"); // validation

// Defining a Mongoose schema for product
const ProductSchema = new mongoose.Schema({
    id :{
        type :Number,
        required : true,
    } ,
    name :{
        type : String,
        required : true
    } ,
    typeOfProduct : {
        type : String,
        enum : ['Dishes','Drinks','Desert'],
    },
    price :{
        type : Number,
        required : true
    } ,
    description : String ,
},{
    // create and update date 
    timestamps:true // Saves createdAt and updatedAt fields automatically
});


const Product = mongoose.model("Product", ProductSchema); // Model for Product


// validation function Create new Product
function validateCreateProduct(obj) {
    const schema = Joi.object({
        id : Joi.number().required(),
        name : Joi.string().min(2).max(200).required(),
        typeOfProduct : Joi.string().valid('Dishes','Drinks','Desert').required(),
        price : Joi.number().min(0).required(),
        description : Joi.string().min(3).max(300)
    });

    return schema.validate(obj);
}

// validation function Update Product
function validateUpdateProduct(obj) {
    const schema = Joi.object({
        id : Joi.number(),
        name : Joi.string().min(2).max(200),
        typeOfProduct : Joi.string().valid('Dishes','Drinks','Desert'),
        price : Joi.number().min(0),
        description : Joi.string().min(3).max(300)
    });
    return schema.validate(obj);
}

module.exports={
    Product,
    validateCreateProduct,
    validateUpdateProduct
}  // Exporting the model

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const { Product,validateCreateProduct,validateUpdateProduct } = require("../models/Product")

// documntation
/**
 *  @desc     Get all products
 *  @route    /api/products
 *  @method   GET
 * @access    Public
 */

router.get("/", async (req, res) => {
    try { 
        const productList = await Product.find().sort({ id : 1}).select('-_id').select('-__v'); 
        res.json(productList); 
        } catch (err) { 
        res.status(400).json({ message: err.message }); 
        } 
});

/**
 *  @desc     Get  product by ID
 *  @route    /api/products/:id
 *  @method   GET
 * @access    Public
 */


router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findOne({id : req.params.id}).sort({ id : 1}).select('-_id').select('-__v');; // go to Email collection to get the member id
        if (!product) {
            res.status(404).json({ message: "The product with the given ID was not found." });
        }
        else {
            res.status(200).json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong!" });
    }
});

/**
 *  @desc     Create new product
 *  @route    /api/products
 *  @method   post
 * @access    Public
 */


router.post("/", async (req, res) => {
    const { error } = validateCreateProduct(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const newProduct = new Product(
            {
                id : req.body.id,
                name : req.body.name,
                typeOfProduct : req.body.typeOfProduct,
                price : req.body.price,
                description : req.body.description
             });
        const result = await newProduct.save();
        res.status(201).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
});


/**
 *  @desc     Update new product
 *  @route    /api/products/:id
 *  @method   put
 * @access    Public
 */

router.put("/:id", async (req, res) => {
    const { error } = validateUpdateProduct(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const UpdateProduct = await Product.findOneAndUpdate(
            { id : req.params.id},
            req.body,
            { new: true }).select('-_id').select('-__v');;
    
        res.status(200).json(UpdateProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }

})

/**
 *  @desc     Delete Product
 *  @route    /api/Products/:id
 *  @method   Delete
 * @access    Public
 */
router.delete("/:id", async (req, res) => {
    try {
        const delProduct = await Product.findOneAndDelete({ id: req.params.id });
    if (!delProduct) {
        res.status(404).json({ error: 'Product not found' });
    } else {
        res.json({ message: 'Product deleted successfully' });
    }
    } catch (error) {
    console.error('Error deleting Product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
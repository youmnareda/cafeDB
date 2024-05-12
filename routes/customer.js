/*
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const { Customer,validateCreateCustomer,validateUpdateCustomer } = require("../models/Customer");
const { TableRes } = require("../models/TableRes");

// documntation
/**
 *  @desc     Get all Customer
 *  @route    /api/customer
 *  @method   GET
 * @access    Public
 */
/*
router.get("/", async (req, res) => {
    try { 
        const customerList = await Customer.find().sort({ id : 1}).select('-_id').select('-__v'); 
        res.json(customerList); 
        } catch (err) { 
        res.status(400).json({ message: err.message }); 
        } 
});

/**
 *  @desc     Get all Customer by ID
 *  @route    /api/customer/:id
 *  @method   GET
 * @access    Public
 */

/*
router.get("/:id", async (req, res) => {
    try {
        const customer = await Customer.findOne({id : req.params.id}).sort({ id : 1}).select('-_id').select('-__v');; // go to Email collection to get the member id
        if (!customer) {
            res.status(404).json({ message: "The customer with the given ID was not found." });
        }
        else {
            res.status(200).json(customer);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong!" });
    }
});

/**
 *  @desc     Create new customer
 *  @route    /api/customer
 *  @method   post
 * @access    Public
 */

/*
router.post("/", async (req, res) => {
    const { error } = validateCreateCustomer(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const newCustomer = new Customer(
            {
                id : req.body.id,
                name : req.body.name,
                phone : req.body.phone,
                email: req.body.email,
                TableRes : req.body.TableRes
            });
        const result = await newCustomer.save();
        res.status(201).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
});
*/

/**
 *  @desc     Update new Customer
 *  @route    /api/customer/:id
 *  @method   put
 * @access    Public
 */
/*
router.put("/:id", async (req, res) => {
    const { error } = validateUpdateCustomer(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const updateCustomer = await Customer.findOneAndUpdate(
            { id : req.params.id},
            req.body,
            { new: true }).select('-_id').select('-__v');;
    
        res.status(200).json(updateCustomer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }

})

/**
 *  @desc     Delete Customer
 *  @route    /api/customer/:id
 *  @method   Delete
 * @access    Public
 */
/*
router.delete("/:id", async (req, res) => {
    try {
        const delCustomer = await Customer.findOneAndDelete({ id: req.params.id });
    if (!delCustomer) {
        res.status(404).json({ error: 'Customer not found' });
    } else {
        res.json({ message: 'Customer deleted successfully' });
    }
    } catch (error) {
    console.error('Error deleting Customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
*/
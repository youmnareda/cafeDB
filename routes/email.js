const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const { Email,validateCreateEmail,validateUpdateEmail } = require("../models/Email")

// documntation
/**
 *  @desc     Get all emails
 *  @route    /api/emails
 *  @method   GET
 * @access    Public
 */

router.get("/", async (req, res) => {
    try { 
        const email = await Email.find().sort({ id : 1}).select('-_id').select('-__v'); 
        res.json(email); 
        } catch (err) { 
        res.status(400).json({ message: err.message }); 
        } 
});

/**
 *  @desc     Get all emails by ID
 *  @route    /api/emails/:id
 *  @method   GET
 * @access    Public
 */


router.get("/:id", async (req, res) => {
    try {
        const email = await Email.findOne({id : req.params.id}).sort({ id : 1}).select('-_id').select('-__v');; // go to Email collection to get the member id
        if (!email) {
            res.status(404).json({ message: "The email with the given ID was not found." });
        }
        else {
            res.status(200).json(email);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong!" });
    }
});

/**
 *  @desc     Create new email
 *  @route    /api/emails
 *  @method   post
 * @access    Public
 */


router.post("/", async (req, res) => {
    const { error } = validateCreateEmail(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const email = new Email(
            {
                id : req.body.id,
                email: req.body.email
            });
        const result = await email.save();
        res.status(201).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
});


/**
 *  @desc     Update new email
 *  @route    /api/emails/:id
 *  @method   put
 * @access    Public
 */

router.put("/:id", async (req, res) => {
    const { error } = validateUpdateEmail(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const email = await Email.findOneAndUpdate(
            { id : req.params.id},
            req.body,
            { new: true }).select('-_id').select('-__v');;
    
        res.status(200).json(email);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }

})

/**
 *  @desc     Delete email
 *  @route    /api/emails/:id
 *  @method   Delete
 * @access    Public
 */
router.delete("/:id", async (req, res) => {
    try {
        const delEmail = await Email.findOneAndDelete({ id: req.params.id });
    if (!delEmail) {
        res.status(404).json({ error: 'Email not found' });
    } else {
        res.json({ message: 'Email deleted successfully' });
    }
    } catch (error) {
    console.error('Error deleting Email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;
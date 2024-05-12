const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const { Feedback,validateCreateFeedback,validateUpdateFeedback } = require("../models/Feedback")

// documntation
/**
 *  @desc     Get all Feedback
 *  @route    /api/feedback
 *  @method   GET
 * @access    Public
 */

router.get("/", async (req, res) => {
    try { 
        const feedbackList = await Feedback.find().sort({ id : 1}).select('-_id').select('-__v'); 
        res.json(feedbackList); 
        } catch (err) { 
        res.status(400).json({ message: err.message }); 
        } 
});

/**
 *  @desc     Get all Feedback by ID
 *  @route    /api/feedback/:id
 *  @method   GET
 * @access    Public
 */


router.get("/:id", async (req, res) => {
    try {
        const feedback = await Feedback.findOne({id : req.params.id}).sort({ id : 1}).select('-_id').select('-__v');; // go to Email collection to get the member id
        if (!feedback) {
            res.status(404).json({ message: "The feedback with the given ID was not found." });
        }
        else {
            res.status(200).json(feedback);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong!" });
    }
});

/**
 *  @desc     Create new feedback
 *  @route    /api/feedback
 *  @method   post
 * @access    Public
 */


router.post("/", async (req, res) => {
    const { error } = validateCreateFeedback(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const newFeedback = new Feedback(
            {
                id : req.body.id,
                name : req.body.name,
                email: req.body.email,
                message: req.body.message,
            });
        const result = await newFeedback.save();
        res.status(201).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
});


/**
 *  @desc     Update new feedback
 *  @route    /api/feedback/:id
 *  @method   put
 * @access    Public
 */

router.put("/:id", async (req, res) => {
    const { error } = validateUpdateFeedback(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const updateFeedback = await Feedback.findOneAndUpdate(
            { id : req.params.id},
            req.body,
            { new: true }).select('-_id').select('-__v');;
    
        res.status(200).json(updateFeedback);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }

})

/**
 *  @desc     Delete feedback
 *  @route    /api/feedback/:id
 *  @method   Delete
 * @access    Public
 */
router.delete("/:id", async (req, res) => {
    try {
        const delFeedback = await Feedback.findOneAndDelete({ id: req.params.id });
    if (!delFeedback) {
        res.status(404).json({ error: 'Feedback not found' });
    } else {
        res.json({ message: 'Feedback deleted successfully' });
    }
    } catch (error) {
    console.error('Error deleting Email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;
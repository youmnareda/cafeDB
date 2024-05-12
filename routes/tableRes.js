const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const { TableRes,validateCreateTableRes,validateUpdateTableRes } = require("../models/TableRes")

// documntation
/**
 *  @desc     Get all TableRes
 *  @route    /api/TableRes
 *  @method   GET
 * @access    Public
 */

router.get("/", async (req, res) => {
    try { 
        const tableResList = await TableRes.find().sort({ id : 1}).select('-_id').select('-__v'); 
        res.json(tableResList); 
        } catch (err) { 
        res.status(400).json({ message: err.message }); 
        } 
});

/**
 *  @desc     Get all TableRes by ID
 *  @route    /api/tableRes/:id
 *  @method   GET
 * @access    Public
 */


router.get("/:id", async (req, res) => {
    try {
        const tableRes = await TableRes.findOne({id : req.params.id}).sort({ id : 1}).select('-_id').select('-__v');; // go to Email collection to get the member id
        if (!tableRes) {
            res.status(404).json({ message: "The tableRes with the given ID was not found." });
        }
        else {
            res.status(200).json(tableRes);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong!" });
    }
});

/**
 *  @desc     Create new tableRes
 *  @route    /api/tableRes
 *  @method   post
 * @access    Public
 */


router.post("/", async (req, res) => {
    const { error } = validateCreateTableRes(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const newTableRes = new TableRes(
            {
                id : req.body.id,
                fullName : req.body.fullName,
                email: req.body.email,
                phone : req.body.phone,
                date : req.body.date,
                time : req.body.time,
                person : req.body.person,
                note : req.body.note
            });
        const result = await newTableRes.save();
        res.status(201).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
});


/**
 *  @desc     Update new tableRes by id
 *  @route    /api/tableRes/:id
 *  @method   put
 * @access    Public
 */

router.put("/:id", async (req, res) => {
    const { error } = validateUpdateTableRes(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const updateTableRes = await TableRes.findOneAndUpdate(
            { id : req.params.id},
            req.body,
            { new: true }).select('-_id').select('-__v');;
    
        res.status(200).json(updateTableRes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }

})

/**
 *  @desc     Delete tableRes by id
 *  @route    /api/tableRes/:id
 *  @method   Delete
 * @access    Public
 */
router.delete("/:id", async (req, res) => {
    try {
        const delTableRes = await TableRes.findOneAndDelete({ id: req.params.id });
    if (!delTableRes) {
        res.status(404).json({ error: 'TableRes not found' });
    } else {
        res.json({ message: 'Reservation has been deleted successfully' });
    }
    } catch (error) {
    console.error('Error deleting TableRes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;
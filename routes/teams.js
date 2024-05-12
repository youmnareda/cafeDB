const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const { Team,validateCreateTeam,validateUpdateTeam } = require("../models/Team")

// documntation
/**
 *  @desc     Get all teams
 *  @route    /api/teams
 *  @method   GET
 * @access    Public
 */

router.get("/", async (req, res) => {
    try { 
        const teamList = await Team.find().sort({ id : 1}).select('-_id').select('-__v'); 
        res.json(teamList); 
        } catch (err) { 
        res.status(400).json({ message: err.message }); 
        } 
});

/**
 *  @desc     Get all teams by ID
 *  @route    /api/teams/:id
 *  @method   GET
 * @access    Public
 */


router.get("/:id", async (req, res) => {
    try {
        const team = await Team.findOne({id : req.params.id}).sort({ id : 1}).select('-_id').select('-__v');; // go to Email collection to get the member id
        if (!team) {
            res.status(404).json({ message: "The team with the given ID was not found." });
        }
        else {
            res.status(200).json(team);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong!" });
    }
});

/**
 *  @desc     Create new team
 *  @route    /api/teams
 *  @method   post
 * @access    Public
 */


router.post("/", async (req, res) => {
    const { error } = validateCreateTeam(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const newTeam = new Team(
            {
                id : req.body.id,
                name : req.body.name,
                position : req.body.position,
                jobTime : req.body.jobTime
            });
        const result = await newTeam.save();
        res.status(201).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
});


/**
 *  @desc     Update new team
 *  @route    /api/teams/:id
 *  @method   put
 * @access    Public
 */

router.put("/:id", async (req, res) => {
    const { error } = validateUpdateTeam(req.body);
    if (error) {
            return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const UpdateTeam = await Team.findOneAndUpdate(
            { id : req.params.id},
            req.body,
            { new: true }).select('-_id').select('-__v');;
    
            res.status(200).json(UpdateTeam);
    } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong!" });
    }

})

/**
 *  @desc     Delete team
 *  @route    /api/teams/:id
 *  @method   Delete
 * @access    Public
 */
router.delete("/:id", async (req, res) => {
    try {
        const delTeam = await Team.findOneAndDelete({ id: req.params.id });
    if (!delTeam) {
        res.status(404).json({ error: 'Team not found' });
    } else {
        res.json({ message: 'Team deleted successfully' });
    }
    } catch (error) {
    console.error('Error deleting team:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;
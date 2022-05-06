const express = require('express');
const router = express.Router();
const { Course, Instructor } = require('../database/models');

//so we don't have to use try-catch for each request handler
const ash = require('express-async-handler');

/** GET ALL INSTRUCTORS */
router.get('/', ash(async(req, res) => {
    let instructors = await Instructor.findAll({include: [Course]});
    res.status(200).json(instructors);
}));

/**GET INSTRUCTOR BY ID */
router.get('/:id', ash(async(req, res) => {
    let instructor = await Instructor.findByPk(req.params.id, {include: [Course]});
    res.status(200).json(instructor);
}));

// Delete Instructor
router.delete('/:id', ash(async(req, res) => {
    await Instructor.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json("Deleted an instructor!");
}));

//Add New Instructor
router.post('/', ash(async(req, res) => {
    let newInstructor = await Instructor.create(req.body);
    res.status(200).json(newInstructor);
}));

//Edit Instructor
router.put('/:id', ash(async(req, res) => {
    await Instructor.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    let instructor = await Instructor.findByPk(req.params.id, {include: [Course]});
    res.status(201).json(instructor);
}));

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
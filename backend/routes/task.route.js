const { createTask, deleteTask, getAllTask, getSpecificTask, updateTask } = require('../controllers/task.controller');

const express = require('express');
const router = express.Router();


router.route("/")
    .post(createTask)
    .get(getAllTask)

router.route("/:id")
    .get(getSpecificTask)
    .put(updateTask)
    .delete(deleteTask)


module.exports = router
const taskModel = require("../schema/task.model");

async function createTask(req, res) {
    try {
        const { title, description, status, dueDate } = req.body;

        if (!title || !description || !dueDate) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
        const task = await taskModel.create({
            title,
            description,
            status,
            dueDate
        })
        res.status(201).json({
            message: 'Task created successfully',
            success: true,
            task
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

async function getAllTask(req, res) {
    try {
        const tasks = await taskModel.find();
        res.status(200).json({
            message: 'Tasks fetched successfully',
            success: true,
            tasks
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}
async function getSpecificTask(req, res) {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'Provide the task id' });
        }
        const task = await taskModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({
            message: 'Task fetched successfully',
            success: true,
            task
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

async function updateTask(req, res) {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'Provide the task id' });
        }
        const data = req.body;
        let task = await taskModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task = await taskModel.findByIdAndUpdate(
            req.params.id,
            { $set: data },
            { new: true }
        );
        if (!task._id) {
            return res.status(404).json({ message: 'Error in updating task' });
        }
        res.status(200).json({
            message: 'Task updated successfully',
            success: true,
            task
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

async function deleteTask(req, res) {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'Provide the task id' });
        }
        const task = await taskModel.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Error in deleting task' });
        }
        res.status(200).json({ message: 'Task removed', success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}
module.exports = {
    createTask,
    getAllTask,
    getSpecificTask,
    updateTask,
    deleteTask
}
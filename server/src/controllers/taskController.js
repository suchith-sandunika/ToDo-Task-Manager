import * as taskService from '../services/taskService.js';

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.viewAllTasks();

        if (!tasks || tasks.length === 0) {
            return res.status(404).send('No tasks found');
        }

        return res.status(200).json({ tasks: tasks });
    } catch (error) {
        return res.status(500).send('Error fetching tasks: ' + error.message);
    }
}

export const addNewTask = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(401).send('Title and description are required');
    }

    try {
        const existingTaskTitle = await taskService.viewTaskByTitle(title);

        if (existingTaskTitle && existingTaskTitle.length > 0) {
            return res.status(409).send('Task title already exists');
        }

        const newTask = { title, description };

        const data = await taskService.addTask(newTask);

        if (!data) {
            return res.status(400).send('Error creating task');
        }

        const taskId = data.insertId;

        const newlyCreatedTask = await taskService.viewTaskById(taskId);

        return res.status(201).json({ message: 'Task added successfully', data: newlyCreatedTask });
    } catch (error) {
        return res.status(500).send('Error adding task: ' + error.message);
    }
}

export const completeExistingTask = async (req, res) => {
    const taskId = req.params.id;

    if (!taskId) {
        return res.status(401).send('Task ID is required');
    }

    try {
        const existingTask = await taskService.viewTaskById(taskId);

        if (!existingTask || existingTask.length === 0) {
            return res.status(404).send('Task not found');
        }

        await taskService.completeTask(taskId);

        return res.status(200).send('Task completed successfully');
    } catch (error) {
        return res.status(500).send('Error completing task: ' + error.message);
    }
}
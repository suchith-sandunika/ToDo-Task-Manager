import express from 'express';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();

// Route to get all tasks ...
router.get('/', taskController.getAllTasks);

// Route to add a new task ...
router.post('/', taskController.addNewTask);

// Route to complete an existing task by ID ...
router.put('/:id', taskController.completeExistingTask);

export default router;


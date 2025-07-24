import { pool } from '../config/dbConnection.js';

export const viewAllTasks = async () => {
    const viewTasksQuery = 'SELECT * FROM tasks WHERE status = ?';
    return await new Promise((resolve, reject) => {
        pool.query(viewTasksQuery, 'Not Completed', (error, result) => {
            if (error) {
                console.error('Error fetching tasks:', error);
                reject(error);
            }

            resolve(result);
        });
    });
}

export const viewTaskById = async (taskId) => {
    const viewTaskByIdQuery = 'SELECT * FROM tasks WHERE taskId = ?';
    return await new Promise((resolve, reject) => {
        pool.query(viewTaskByIdQuery, taskId, (error, result) => {
            if (error) {
                console.error('Error fetching task by ID:', error);
                reject(error);
            }

            resolve(result);
        });
    });
}

export const viewTaskByTitle = async (title) => {
    const viewTaskByTitleQuery = 'SELECT * FROM tasks WHERE title = ?';
    return await new Promise((resolve, reject) => {
        pool.query(viewTaskByTitleQuery, title, (error, result) => {
            if (error) {
                console.error('Error fetching task by title:', error);
                reject(error);
            }

            resolve(result);
        });
    });
}

export const addTask = async (task) => {
    const addTaskQuery = 'INSERT INTO tasks (title, description, status, createdAt) VALUES (?, ?, ?, ?)';
    const values = [task.title, task.description, 'Not Completed', new Date()];
    return await new Promise((resolve, reject) => {
        pool.query(addTaskQuery, values, (error, result) => {
            if (error) {
                console.error('Error adding task:', error);
                reject(error);
            }

            resolve(result);
        });
    });
}

export const completeTask = async (taskId) => {
    const completeTaskQuery = 'UPDATE tasks SET status = ? WHERE taskId = ?';
    const values = ['Completed', taskId];
    return await new Promise((resolve, reject) => {
        pool.query(completeTaskQuery, values, (error, result) => {
            if (error) {
                console.error('Error completing task:', error);
                reject(error);
            }

            resolve(result);
        });
    });
}
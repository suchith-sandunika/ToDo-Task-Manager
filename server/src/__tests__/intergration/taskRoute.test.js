import request from 'supertest';
import { describe, it, beforeEach, vitest, expect } from 'vitest';
import express from 'express';
import taskRoute from '../../routes/taskRoute.js';
import * as taskService from '../../services/taskService.js';

const app = express();

app.use(express.json());
app.use('/api/v1/tasks', taskRoute);

describe('Task Routes', () => {
    beforeEach(() => {
        vitest.restoreAllMocks();
    });

    describe('GET /api/v1/tasks', () => {
        it('GET / - should return all tasks', async () => {
            const mockTasks = [
                { taskId: 1, title: 'Task A', description: 'Description A', status: 'Not Completed' },
                { taskId: 2, title: 'Task B', description: 'Description B', status: 'Completed' }
            ];

            // Mock service call ...
            vitest.spyOn(taskService, 'viewAllTasks').mockResolvedValue(mockTasks);

            const res = request(app).get('/api/v1/tasks');
            console.log(res.body, res.status);
            expect(res.status).toBe(200);
            expect(res.body).toEqual({ tasks: mockTasks });
        });

        it('GET / - should return 404 if no tasks found', async () => {
            // Mock service call ...
            vitest.spyOn(taskService, 'viewAllTasks').mockResolvedValue([]);

            const res = request(app).get('/api/v1/tasks');
            console.log(res.body, res.status);
            expect(res.status).toBe(404);
            expect(res.text).toEqual('No tasks found');
        });
    });

    describe('POST /api/v1/tasks', () => {
        it('POST /tasks - should add a new task and return 201', async () => {
            const newTaskBody = { title: 'New Task', description: 'Test desc' };
            const mockTask = { taskId: 3, title: 'New Task', description: 'Test desc', status: 'Not Completed' };

            vitest.spyOn(taskService, 'viewTaskByTitle').mockResolvedValue([]);
            vitest.spyOn(taskService, 'addTask').mockResolvedValue({ insertId: 3 });
            vitest.spyOn(taskService, 'viewTaskById').mockResolvedValue([mockTask]);

            const res = await request(app).post('/api/v1/tasks').send(newTaskBody);

            expect(res.status).toBe(201);
            expect(res.body.message).toBe('Task added successfully');
        });
    });

    describe('PUT /api/v1/tasks/:id', () => {
        it('PUT /tasks/:id - should complete a task and return 200', async () => {
            const taskId = 1;
            const existingTask = { taskId: 1, title: 'Task A', description: 'Description A', status: 'Not Completed' };

            vitest.spyOn(taskService, 'viewTaskById').mockResolvedValue([existingTask]);
            vitest.spyOn(taskService, 'completeTask').mockResolvedValue({ insertId: 1 });

            const res = await request(app).put(`/api/v1/tasks/${taskId}`);

            expect(res.status).toBe(200);
            expect(res.text).toBe('Task completed successfully');
        });

        it('PUT /tasks/:id - should return 404, if the task not found', async () => {
            const taskId = 1;

            vitest.spyOn(taskService, 'viewTaskById').mockResolvedValue([]);

            const res = await request(app).put(`/api/v1/tasks/${taskId}`);

            expect(res.status).toBe(404);
            expect(res.text).toBe('Task not found');
        });
    })
});
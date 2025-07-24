import { describe, expect, test, beforeEach, afterEach, vitest } from 'vitest';
import * as taskController from '../../controllers/taskController.js';
import * as taskService from '../../services/taskService.js';

describe('Task Controller', () => {
    let req, res;

    // Setup mock request and response objects before each test ...
    beforeEach(() => {
       req = {};
       res = {
           status: vitest.fn().mockReturnThis(),
           json: vitest.fn(),
           send: vitest.fn()
       }
    });

    // Clearly mocks after each test to prevent leaks between tests ...
    afterEach(() => {
        vitest.clearAllMocks();
    });

    // Unit Tests for getAllTasks ...
    test('getAllTasks - Return the tasks if found', async () => {
        const mockTasks = [
            { taskId: 1, title: 'test_title_1', description: 'test_description_1' },
            { taskId: 2, title: 'test_title_2', description: 'test_description_2' }
        ];
        vitest.spyOn(taskService, 'viewAllTasks').mockResolvedValue(mockTasks);
        await taskController.getAllTasks(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ tasks: mockTasks });
    });

    test('getAllTasks - Return 404 if no tasks found', async () => {
        vitest.spyOn(taskService, 'viewAllTasks').mockResolvedValue([]);
        await taskController.getAllTasks(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('No tasks found');
    });

    test('getAllTasks - Return 500 if any other error occurred', async () => {
        // Mock service to throw an error ...
        taskService.viewAllTasks.mockRejectedValue(new Error('Database error'));
        await taskController.getAllTasks(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error fetching tasks: Database error');
    });

    // Unit Tests for addNewTask ...
    test('addNewTask - Return 401 if the title is not provided', async () => {
        req.body = { title: '', description: 'Test_Description' };
        await taskController.addNewTask(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Title and description are required');
    });

    test('addNewTask - Return 401 if the description is not provided', async () => {
        req.body = { title: 'Test_Title', description: '' };
        await taskController.addNewTask(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Title and description are required');
    });

    test('addNewTask - Return 401 if the both title and description are not provided', async () => {
        req.body = { title: '', description: '' };
        await taskController.addNewTask(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Title and description are required');
    });

    test('addNewTask - Return 409 if there is data related to the given title', async () => {
        req.body = { title: 'Test_Title', description: 'Test_Description' };
        const mockTask = { taskId: 1, title: 'Test_Title', description: 'Test_Description1', status: 'Not Completed' };
        vitest.spyOn(taskService, 'viewTaskByTitle').mockResolvedValue([mockTask]);
        await taskController.addNewTask(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.send).toHaveBeenCalledWith('Task title already exists');
    });

    test('addNewTask - return 400 if data insertion failed', async () => {
        req.body = { title: 'Test_Title', description: 'Test_Description' };
        vitest.spyOn(taskService, 'viewTaskByTitle').mockResolvedValue([]);
        vitest.spyOn(taskService, 'addTask').mockResolvedValue(null);

        await taskController.addNewTask(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Error creating task');
    });

    test('addNewTask - return 201 if data insertion successfull', async () => {
        req.body = { title: 'Test_Title', description: 'Test_Description' };
        const newlyCreatedMockTask = { taskId: 1, title: 'Test_Title', description: 'Test_Description', status: 'Not Completed', createdAt: '2023-10-01T00:00:00Z' };
        vitest.spyOn(taskService, 'viewTaskByTitle').mockResolvedValue([]);
        vitest.spyOn(taskService, 'addTask').mockResolvedValue({ insertId: 1 });
        vitest.spyOn(taskService, 'viewTaskById').mockResolvedValue([newlyCreatedMockTask]);

        await taskController.addNewTask(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Task added successfully', data: [newlyCreatedMockTask] });
    });

    test('addNewTask - Return 500 if any other error occurred', async () => {
        req.body = { title: 'Test_Title', description: 'Test_Description' };
        // Mock service to throw an error ...
        taskService.viewTaskById.mockRejectedValue(new Error('Database error'));
        await taskController.addNewTask(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error adding task: Database error');
    });

    // Unit Tests for completeExistingTask ...
    test('completeExistingTask - Return 401 if taskId is not provided', async () => {
        req.params = { id: '' };

        await taskController.completeExistingTask(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Task ID is required');
    });

    test('completeExistingTask - Return 404 if the task for given taskId is not found', async () => {
        req.params = { id: '1' };

        vitest.spyOn(taskService, 'viewTaskById').mockResolvedValue([]);

        await taskController.completeExistingTask(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Task not found');
    });

    test('completeExistingTask - Return 200 if task is successfully completed', async () => {
        req.params = { id: '1' };
        const mockTask = { taskId: 1, title: 'Test_Title', description: 'Test_Description', status: 'Not Completed', createdAt: '2023-10-01T00:00:00Z' };
        const updatedMockTask = { taskId: 1, title: 'Test_Title', description: 'Test_Description', status: 'Completed', createdAt: '2023-10-01T00:00:00Z' };
        vitest.spyOn(taskService, 'viewTaskById').mockResolvedValue([mockTask]);
        vitest.spyOn(taskService, 'completeTask').mockResolvedValue([updatedMockTask]);

        await taskController.completeExistingTask(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Task completed successfully');
    });

    test('completeExistingTask - Return 500 if any other error occurred', async () => {
        req.params = { id: '1' };
        // Mock service to throw an error ...
        taskService.viewTaskById.mockRejectedValue(new Error('Database error'));
        await taskController.completeExistingTask(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error completing task: Database error');
    });
});
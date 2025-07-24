import { vi, describe, it, expect, beforeEach, vitest } from 'vitest';
import { pool } from '../../config/dbConnection.js';
import * as taskService from '../../services/taskService.js';

// Mock the whole dbConnection module ...
vitest.mock('../../src/config/dbConnection.js', () => {
    return {
        pool: {
            query: vitest.fn()
        }
    };
});

describe('taskService', () => {
    beforeEach(() => {
        vitest.restoreAllMocks();
    });

    describe('viewAllTasks', () => {

        it('should return tasks if DB query is successful', async () => {
            const mockTasks = [
                { taskId: 1, title: 'Task A', description: 'desc', status: 'Not Completed' }
            ];

            vitest.spyOn(pool, 'query').mockImplementation((query, params, callback) => {
                callback(null, mockTasks);
            });

            const result = await taskService.viewAllTasks();

            expect(result).toEqual(mockTasks);
        });

        it('should throw an error if database query fails', async () => {
            const mockError = new Error('Database error');

            // Mock the pool.query to simulate the error ...
            vitest.spyOn(pool, 'query').mockImplementation((query, params, callback) => {
                callback(mockError, null);
            });

            // Assert that it throws the same error
            expect(taskService.viewAllTasks()).rejects.toThrow('Database error');
        });
    });

    describe('viewTaskById', () => {

        it('should return relevant task if DB query is successful', async () => {
            const mockTask = { taskId: 1, title: 'Task A', description: 'desc', status: 'Not Completed' };

            vitest.spyOn(pool, 'query').mockImplementation((query, params, callback) => {
                callback(null, mockTask);
            });

            const result = await taskService.viewTaskById(1);

            expect(result).toEqual(mockTask);
        });

        it('should throw an error if database query fails', async () => {
            const mockError = new Error('Database error');

            // Mock the pool.query to simulate the error ...
            vitest.spyOn(pool, 'query').mockImplementation((query, params, callback) => {
                callback(mockError, null);
            });

            // Assert that it throws the same error
            expect(taskService.viewTaskById(1)).rejects.toThrow('Database error');
        });
    });

    describe('viewTaskByTitle', () => {

        it('should return relevant task if DB query is successful', async () => {
            const mockTask = { taskId: 1, title: 'Task A', description: 'desc', status: 'Not Completed' };

            vitest.spyOn(pool, 'query').mockImplementation((query, params, callback) => {
                callback(null, mockTask);
            });

            const result = await taskService.viewTaskByTitle('Task A');

            expect(result).toEqual(mockTask);
        });

        it('should throw an error if database query fails', async () => {
            const mockError = new Error('Database error');

            // Mock the pool.query to simulate the error ...
            vitest.spyOn(pool, 'query').mockImplementation((query, params, callback) => {
                callback(mockError, null);
            });

            // Assert that it throws the same error
            expect(taskService.viewTaskByTitle('Task A')).rejects.toThrow('Database error');
        });
    });

    describe('addTask', () => {

        it('should return response if DB query is successful', async () => {
            const mockTask = { taskId: 1, title: 'Task A', description: 'desc', status: 'Not Completed' };
            const task = { title: 'Task A', description: 'desc' };
            vitest.spyOn(pool, 'query').mockImplementation((query, params, callback) => {
                callback(null, mockTask);
            });

            const result = await taskService.addTask(task);

            expect(result).toEqual(mockTask);
        });

        it('should throw an error if database query fails', async () => {
            const mockError = new Error('Database error');
            const task = { title: 'Task A', description: 'desc' };
            // Mock the pool.query to simulate the error ...
            vitest.spyOn(pool, 'query').mockImplementation((query, params, callback) => {
                callback(mockError, null);
            });

            // Assert that it throws the same error
            expect(taskService.addTask(task)).rejects.toThrow('Database error');
        });
    });

    describe('completeTask', () => {

        it('should return response if DB query is successful', async () => {
            const mockTask = { taskId: 1, title: 'Task A', description: 'desc', status: 'Not Completed' };
            const taskId = 1;
            vitest.spyOn(pool, 'query').mockImplementation((query, params, callback) => {
                callback(null, mockTask);
            });

            const result = await taskService.completeTask(taskId);

            expect(result).toEqual(mockTask);
        });

        it('should throw an error if database query fails', async () => {
            const mockError = new Error('Database error');
            const taskId = 1;
            // Mock the pool.query to simulate the error ...
            vitest.spyOn(pool, 'query').mockImplementation((query, params, callback) => {
                callback(mockError, null);
            });

            // Assert that it throws the same error
            expect(taskService.completeTask(taskId)).rejects.toThrow('Database error');
        });
    });
});

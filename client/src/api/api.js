import axios from 'axios';
import { serverURL } from "../utils/env.js";

const api = axios.create({
    baseURL: `${serverURL}/api/v1/tasks`,
    headers: {
        'Content-Type': 'application/json',
    },
});

const fetchAllTasks = async () => {
    const response = await api.get('/');
    // console.log('API Response:', response.data);
    return response.data.tasks;
};

const addNewTask = async ({ title, description }) => {
    const response = await api.post('/', { title: title, description: description });
    // console.log('API Response:', response.data);
    return response.data.data;
};

const completeTask = async (taskId) => {
    const response = await api.put(`/${taskId}`);
    // console.log('API Response:', response.data);
    return response.data.data;
};

export { fetchAllTasks, addNewTask, completeTask };
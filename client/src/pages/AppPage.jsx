import { memo, useCallback, useEffect, useReducer, useState } from 'react';
import { fetchAllTasks, addNewTask, completeTask } from '../api/api';
import Form from '../components/Form';
import Card from '../components/Card';
import Message from '../components/Message';
import { changeDateFormat } from '../utils/utils';
import image from '../assets/Todo-List-board.jpg';
import logo from '../assets/Todo-App-Logo.jpg';
import nothing from '../assets/Todo-Nothing.jpg';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppPage = () => {

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const [tasks, setTasks] = useState([]);
    const [success, setSuccess] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchAllTasks()
            .then((tasks) => {
                setTasks(tasks);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
                setError(true);
            }
        );
    }, []);

    const addTask = useCallback((e) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            setError(true);
            return;
        }

        console.log('Adding task:', formData);

        addNewTask({ title: formData.title, description: formData.description })
            .then((data) => {
                console.log(data);
                setLoadingAdd(true);
                setTimeout(() => {
                    setLoadingAdd(false);
                    setSuccess(true);
                    setTasks([...tasks, data[0]]);
                    console.log(tasks);
                    setFormData({ title: '', description: '' });
                    setError(false);
                    setSuccess(false);
                }, 1000);
            })
            .catch((error) => {
                console.error('Error adding task:', error);
                setError(true);
            }
        );
    }, [formData, tasks]);

    const handleCompleteTask = useCallback((id) => {
        completeTask(id)
            .then((data) => {
                setLoadingComplete(true);
                setTimeout(() => {
                    setLoadingComplete(false);
                    setSuccess(true);
                    setTasks(tasks.filter(task => task.taskId !== id));
                    setError(false);
                    setSuccess(false);
                }, 1000);
            })
            .catch((error) => {
                console.error('Error completing task:', error);
                setError(true);
            }
        );
    }, [tasks]);

    return (
        <div className='div-height' data-testId='app-page'>
            <div className='d-flex justify-content-center align-content-center'>
                <div className='w-card h-50'>
                    <div className='rounded'>
                        <div className='card bg-color border-white'>
                            <div className='card-header bg-color border-0'>
                                <div className='card-title'>
                                    <div className='d-flex justify-content-center align-content-center mt-2'>
                                        <h2 className='text-center text-white fw-bold'>
                                            <img src={logo} alt={logo} className='me-3 rounded border-white img-size'/>
                                            To Do App
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-3 h-100'>
                                        <div className='card card-body bg-soft' data-testId='form-component'>
                                            <Form title={formData.title} description={formData.description}
                                                  changeTitle={(e) => setFormData({ ...formData, title: e.target.value })}
                                                  changeDescription={(e) => setFormData({ ...formData, description: e.target.value })}
                                                  click={addTask}
                                                  status={((!formData.title || !formData.description) && error)}
                                                  loading1={loadingAdd}
                                            />
                                        </div>
                                        { success && !loadingAdd && !error && (
                                            <Message type={'success'} message={'Task Added Successfully'}/>
                                        )}
                                        { loadingAdd && !success && !error && (
                                            <Message type={'loading'} message={'Loading ... Please Wait'}/>
                                        )}
                                        { error && loadingAdd && success && (
                                            <Message type={'error'} message={'Task Added Successfully'}/>
                                        )}
                                    </div>
                                    <div className='col-md-9 pe-4'>
                                        <div className='row'>
                                            <div className='card card-body bg-soft p-0'>
                                                <div className='row align-items-center justify-content-center ms-2'>
                                                    <div className='col-md-7' data-testId='card-component'>
                                                        {tasks.length > 0 ? (
                                                            tasks.map((task, key) => (
                                                                <Card title={tasks[key].title}
                                                                      time={changeDateFormat(tasks[key].createdAt)}
                                                                      body={tasks[key].description}
                                                                      buttonClick={() => handleCompleteTask(tasks[key].taskId)}
                                                                      loading2={loadingComplete}
                                                                />
                                                            ))
                                                        ) : (
                                                            <h3 className='text-center fw-bold text-white text-md-center'>
                                                                Oops! No Tasks Found!
                                                            </h3>
                                                        )}
                                                    </div>
                                                    <div className='col-md-5 h-100'>
                                                        <img src={tasks.length > 0 ? image : nothing} alt={tasks.length > 0 ? image : nothing}
                                                             className='card-img p-0 w-100 h-100 rounded-0 rounded-end-2'
                                                             style={{padding: 0, margin: 0, border: 'none'}}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(AppPage);
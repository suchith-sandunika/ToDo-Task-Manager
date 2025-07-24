import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Form = ({ title, changeTitle, description, changeDescription, click, status, loading1 }) => {
    return (
        <form onSubmit={click} data-testid='form'>
            <div>
                <label className='form-label text-white'>
                    Title
                    <span className='text-danger ms-1'>*</span>
                </label>
                <input data-testid='input' className={title ? 'border-success form-control mb-2 bg-dark text-white' : 'border-danger form-control mb-2 bg-dark text-white'} value={title} onChange={changeTitle} placeholder='Enter the Task Title'/>
                { !title && status === true && (
                    <span className='text-center text-danger mt-2'>Title is Required</span>
                ) }
            </div>
            <div className='mt-2'>
                <label className='form-label text-white'>
                    Description
                    <span className='text-danger ms-1'>*</span>
                </label>
                <textarea data-testId='textarea' className={description ? 'border-success form-control mb-2 bg-dark text-white' : 'border-danger form-control mb-2 bg-dark text-white'} value={description} onChange={changeDescription} placeholder='Enter the Task Description'></textarea>
                { !description && status && (
                    <span className='text-center text-danger mt-2'>Description is Required</span>
                ) }
            </div>
            <div className='d-flex justify-content-end align-content-end'>
                <button className='mt-1 btn btn-dark border-white btn-sm text-white' onClick={click} data-testid='button'>
                    {(title && description && loading1) ? (
                        <i className="fas fa-spinner fa-spin fa-sm text-sm-center text-white" data-testid='spinner'></i>
                    ) : (
                        'Add Task'
                    )}
                </button>
            </div>
        </form>
    )
}

export default Form;
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Card = ({ title, time, body, buttonClick, loading2 }) => {
    return (
        <div className='card mb-2 mt-2 h-card bg-so-soft border-white' data-testid='card'>
            <div className='card-body'>
                <div className='d-flex justify-content-between'>
                    <h5 className='fw-bold text-white'>
                        {title}
                    </h5>
                    <p className='text-white text-end' data-testid='date'>
                        {time}
                    </p>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <p className='text-start text-white text-sm'>
                            {body}
                        </p>
                    </div>
                    <div className='col-md-6'>
                        <div className='align-items-end d-flex justify-content-end'>
                            <button className='btn btn-dark btn-sm border-white text-white' data-testid='button' onClick={buttonClick}>
                                {loading2 ? (
                                    <i className="fas fa-spinner fa-spin fa-sm text-primary text-white" data-testid='spinner'></i>
                                ) : (
                                    'Done'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;
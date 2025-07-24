const Message = ({ type, message }) => {
    return (
        <input data-testId='message-input' type='text' disabled
               className={ type === 'success' ? 'mt-2 bg-success text-white rounded text-center' : (type === 'loading' ? 'mt-2 bg-warning text-white rounded text-center' : 'mt-2 bg-danger text-white rounded text-center') }
               value={message}
        />
    )
}

export default Message;
const changeDateFormat = (date) => {
    if (!date) return '';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return '';

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Colombo'
    };

    const formatted = parsedDate.toLocaleString('en-GB', options); // Format: DD/MM/YYYY, HH:mm:ss

    // Extract and rearrange to YYYY-MM-DD HH:mm:ss
    const [datePart, timePart] = formatted.split(', ');
    const [day, month, year] = datePart.split('/');

    return `${year}-${month}-${day}, at ${timePart}`;
}

export { changeDateFormat };
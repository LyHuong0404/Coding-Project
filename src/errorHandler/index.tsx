import axios from 'axios';
import { toast } from 'react-toastify';

export const handleError = (error: any): void => {
    if (axios.isAxiosError(error)) {
        if (error.message === 'Request aborted') {
            console.log('Request was aborted');
        } else {
            console.log(`Axios error: ${error.message}`);
        }
    } else {
        console.log('Non-Axios error: ', error);
    }

    toast.error('Something went wrong. Please try again.');
};

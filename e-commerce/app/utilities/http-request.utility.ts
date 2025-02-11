import axios from 'axios';
import { Environment } from '../models';

export const axiosInstance = axios.create({
    baseURL: `${Environment.API_URLl}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

import { axiosInstance } from '../utilities';
const path = '/categories';

export const getCategories = async () => axiosInstance.get(path);
export const getCategoriesFeatured = async () => axiosInstance.get(`${path}/featured`);

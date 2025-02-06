import { useEffect, useState } from 'react';
import { getCategories, getCategoriesFeatured } from '../services';

export const useUserGetCategories = () => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await getCategories();
                setResult(response.data);
                setError(null);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { result, loading, error };
};

export const useUserGetCategoriesFeatured = () => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await getCategoriesFeatured();
                setResult(response.data);
                setError(null);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { result, loading, error };
};

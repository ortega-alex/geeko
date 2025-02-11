import { useEffect, useState } from 'react';
import { getCategoriesFeatured } from '../services';
import { CategoryType } from '../types';

export const useUserGetCategoriesFeatured = () => {
    const [categoriesFeatureds, setCategoriesFeatured] = useState<Array<CategoryType>>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await getCategoriesFeatured();
                setCategoriesFeatured(response.data);
                setError(null);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { categoriesFeatureds, loading, error };
};

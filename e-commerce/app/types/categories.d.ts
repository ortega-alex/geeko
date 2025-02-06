import { ProductType } from './product';

export type CategoryType = {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    isFeatured?: boolean;
    products?: Array<ProductType>;
};

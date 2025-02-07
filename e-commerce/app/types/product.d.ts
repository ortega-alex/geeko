export type ProductType = {
    _id: string;
    title: string;
    description: string;
    specs?: string[];
    sizes?: string[];
    colors?: string[];
    price: number;
    discountPrice?: number;
    isAvailable: boolean;
    imagesUrls?: string[];
    image?: string;
    category?: string;
};

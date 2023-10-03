export type Profile = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female';
    image: string;
    token: string;
};

export type ProductType = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: [string, string, string];
    inCartAmount: number;
};

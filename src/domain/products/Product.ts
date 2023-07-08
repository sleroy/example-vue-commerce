export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    ratings: number;
    reviews: number;
    isAddedToCart: boolean;
    isAddedBtn: boolean;
    isFavourite: boolean;
    quantity: number;
}
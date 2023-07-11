export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    ratings: number;
    reviews: number;
    isAddedToCart: boolean;
    isAddedBtn: boolean;
    isFavourite: boolean;
    image: string | undefined | null;
    quantity: number;
}
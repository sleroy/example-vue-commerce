export class Product {
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

    total() {
        return this.price * this.quantity;
    }

    data() : ProductData{
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            price: this.price,
            ratings: this.ratings,
            reviews: this.reviews,
            isFavourite: this.isFavourite,
            image: this.image,
            quantity: this.quantity
        }
    }
}

export interface ProductData {
    id: string;
    title: string;
    description: string;
    price: number;
    ratings: number;
    reviews: number;
    isFavourite: boolean;
    image: string | undefined | null;
    quantity: number;

}
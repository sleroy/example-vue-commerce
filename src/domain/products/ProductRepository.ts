import { useCommerceStore } from '@/stores/commerce.ts'

export class ProductRepository {
    private _store: ReturnType<typeof useCommerceStore>;

    constructor() {
        this._store = useCommerceStore();
    }

    get store() {
        return this._store;
    }

    get products() : Product[] {
        return this._store.products;
    }

    getNumberOfProductsAdded() {
        return this.productsAdded().length
    }

    productsAdded() {
        return this._store.products.filter(el => {
            return el.isAddedToCart;
        });
    }
    productsAddedToFavourite() {
        return this.products.filter(el => {
            return el.isFavourite;
        });
    }
    getProductById(id: string) {
        return this._store.products.find(product => product.id == id);
    }

    quantity() {
        return this._store.products.quantity;
    }

    addToCart(id) {
        this.products.forEach(el => {
            if (id === el.id) {
                el.isAddedToCart = true;
            }
        });
    }

    setAddedBtn(data) {
        this.products.forEach(el => {
            if (data.id === el.id) {
                el.isAddedBtn = data.status;
            }
        });
    }

    removeFromCart(id) {
        this.products.forEach(el => {
            if (id === el.id) {
                el.isAddedToCart = false;
            }
        });
    }

    removeProductsFromFavourite() {
        this.products.filter(el => {
            el.isFavourite = false;
        });
    }

    setAddedBtn(data) {
        this.products.forEach(el => {
            if (data.id === el.id) {
                el.isAddedBtn = data.status;
            }
        });
    }
    removeFromCart(id) {
        this.products.forEach(el => {
            if (id === el.id) {
                el.isAddedToCart = false;
            }
        });
    }

    removeProductsFromFavourite() {
        this.products.filter(el => {
            el.isFavourite = false;
        });
    }

    addToFavourite(id) {
        this.products.forEach(el => {
            if (id === el.id) {
                el.isFavourite = true;
            }
        });
    }
    removeFromFavourite(id) {
        this.products.forEach(el => {
            if (id === el.id) {
                el.isFavourite = false;
            }
        });
    }
    setQuantity(data) {
        this.products.forEach(el => {
            if (data.id === el.id) {
                el.quantity = data.quantity;
            }
        });
    }
}
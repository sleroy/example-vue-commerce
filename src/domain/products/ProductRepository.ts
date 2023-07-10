import { useCommerceStore } from '@/stores/commerce.ts'
import type { Product } from './Product';
import { DemoProductDatabaseAdapter } from '../../adapters/memory/DemoProductDatabaseAdapter';
import type { ProductDatabaseConnector } from '../../connectors/ProductDatabaseConnector';
import { productConnector } from '../../adapters/AdapterStrategy';

export class ProductRepository {
    private _store: ReturnType<typeof useCommerceStore>;
    private productDB: ProductDatabaseConnector

    constructor() {
        this._store = useCommerceStore();
        this.productDB = productConnector(this._store.features.storage)        
    }

    get store() {
        return this._store;
    }

    get products(): Product[] {
        return this._store.products;
    }

    load() {
        this.productDB.loadProducts().then(r => {
            this._store.loadProducts(r.products)
        });
    }

    getNumberOfProductsAdded(): number {
        return this.productsAdded().length
    }

    productsAdded(): Product[] {
        return this._store.products.filter(el => {
            return el.isAddedToCart;
        });
    }
    productsAddedToFavourite(): Product[] {
        return this.products.filter(el => {
            return el.isFavourite;
        });
    }

    generateBuyStats() {
        let totalProducts = this._store.products.length,
            productsAdded = this.productsAdded(),
            pricesArray = [],
            productLabel = '',
            finalPrice = '',
            quantity = 1;

        productsAdded.forEach(product => {

            if (product.quantity >= 1) {
                quantity = product.quantity;
            }

            pricesArray.push((product.price * quantity)); // get the price of every product added and multiply quantity
        });

        finalPrice = pricesArray.reduce((a, b) => a + b, 0); // sum the prices

        if (totalProducts > 1) { // set plural or singular
            productLabel = 'products';
        } else {
            productLabel = 'product';
        }
        return {
            totalProducts,
            productLabel,
            finalPrice
        }
    }

    getProductById(id: number): Product | undefined {
        return this._store.products.find(product => product.id == id);
    }

    quantity() {
        return this._store.products.quantity;
    }

    addToCart(id: number) {
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

    removeFromCart(id: number) {
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

    addToFavourite(id: number) {
        this.products.forEach(el => {
            if (id === el.id) {
                el.isFavourite = true;
            }
        });
    }
    removeFromFavourite(id: number) {
        this.products.forEach(el => {
            if (id === el.id) {
                el.isFavourite = false;
            }
        });
    }
    setQuantity(data: any) {
        this.products.forEach(el => {
            if (data.id === el.id) {
                el.quantity = data.quantity;
            }
        });
    }
}
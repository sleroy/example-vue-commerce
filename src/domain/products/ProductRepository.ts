import { useCommerceStore } from '@/stores/commerce'
import type { Product } from './Product';
import type { ProductDatabaseConnector } from '../../connectors/ProductDatabaseConnector';
import { obtainProductDB } from '../../adapters/AdapterStrategy';
import { Events, eventbus } from '../eventBus';
import { type Emitter, type EventType } from 'mitt';

export class ProductRepository {
    private _store: ReturnType<typeof useCommerceStore>;
    private productDB: ProductDatabaseConnector
    eventBus: Emitter<Record<EventType, unknown>>;

    constructor() {
        this._store = useCommerceStore();
        this.productDB = obtainProductDB(this._store.features)        
        this.eventBus = eventbus
        
        // We listen to userSignin event
        this.eventBus.on(Events.userSignin, (e) => {
            this.onUserSignin()
        }); // 'e' has inferred type 'string'
    }

    onUserSignin() {
        console.log("Refreshing the products")
        this.load()
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
            pricesArray = [] as number[],
            productLabel = '',
            finalPrice = 0,
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

    getProductById(id: string): Product | undefined {
        return this._store.products.find((product: Product) => product.id == id);
    }

    addToCart(id: string) {
        this.products.forEach(el => {
            if (id === el.id) {
                el.isAddedToCart = true;
            }
        });
    }

    setAddedBtn(data: any) {
        this.products.forEach(el => {
            if (data.id === el.id) {
                el.isAddedBtn = data.status;
            }
        });
    }

    removeFromCart(id: string) {
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

    addToFavourite(id: string) {
        this.products.forEach(el => {
            if (id === el.id) {
                el.isFavourite = true;
            }
        });
    }
    removeFromFavourite(id: string) {
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
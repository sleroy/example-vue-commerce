import { useCommerceStore } from '@/stores/commerce'
import { Product, type ProductData } from './Product'
import type { ProductDatabaseConnector } from '../../connectors/ProductDatabaseConnector'
import { Events, eventbus, registerEventHandler } from '../eventBus'
import { type Emitter, type EventType } from 'mitt'

export class ProductRepository {
    private eventBus: Emitter<Record<EventType, unknown>>

    constructor(private productDB: ProductDatabaseConnector) {
        this.eventBus = eventbus

        // We listen to userSignin event
        registerEventHandler(Events.userSignin, (e) => {
            this.onUserSignin()
        }) // 'e' has inferred type 'string'
    }

    onUserSignin() {
        this.load()
    }

    get store() {
        return useCommerceStore()
    }

    get products(): Product[] {
        return this.store.products
    }

    load() {
        console.log('Refreshing the products')
        this.productDB.loadProducts().then((r) => {
            this.store.loadProducts(r.products)
        })
    }

    getNumberOfProductsAdded(): number {
        return this.productsAdded().length
    }

    productsAdded(): Product[] {
        return this.store.products.filter((el) => {
            return el.isAddedToCart
        })
    }

    clearCart() {
        const newList = [] as Product[]
        this.store.products.forEach((p: Product) => {
            p.isAddedToCart = false
            p.quantity = 0
            newList.push(p)
        })
        this.store.products = newList
    }

    productsAddedToFavourite(): Product[] {
        return this.products.filter((el) => {
            return el.isFavourite
        })
    }

    generateBuyStats() {
        let totalProducts = this.store.products.length,
            productsAdded = this.productsAdded(),
            pricesArray = [] as number[],
            productLabel = '',
            finalPrice = 0,
            quantity = 1

        productsAdded.forEach((product) => {
            if (product.quantity >= 1) {
                quantity = product.quantity
            }

            pricesArray.push(product.price * quantity) // get the price of every product added and multiply quantity
        })

        finalPrice = pricesArray.reduce((a, b) => a + b, 0) // sum the prices

        if (totalProducts > 1) {
            // set plural or singular
            productLabel = 'products'
        } else {
            productLabel = 'product'
        }
        return {
            totalProducts,
            productLabel,
            finalPrice
        }
    }

    getProductById(id: string): Product | undefined {
        return this.store.products.find((product: Product) => product.id == id)
    }

    addToCart(id: string) {
        this.products.forEach((el) => {
            if (id === el.id) {
                el.isAddedToCart = true
            }
        })
    }

    setAddedBtn(data: any) {
        this.products.forEach((el) => {
            if (data.id === el.id) {
                el.isAddedBtn = data.status
            }
        })
    }

    removeFromCart(id: string) {
        this.products.forEach((el) => {
            if (id === el.id) {
                el.isAddedToCart = false
            }
        })
    }

    removeProductsFromFavourite() {
        this.products.filter((el) => {
            el.isFavourite = false
        })
    }

    addToFavourite(id: string) {
        this.products.forEach((el) => {
            if (id === el.id) {
                el.isFavourite = true
            }
        })
    }
    removeFromFavourite(id: string) {
        this.products.forEach((el) => {
            if (id === el.id) {
                el.isFavourite = false
            }
        })
    }
    setQuantity(data: any) {
        this.products.forEach((el) => {
            if (data.id === el.id) {
                el.quantity = data.quantity
            }
        })
    }

    getCart(): ProductData[] {
        return this.productsAdded().map((pr) => pr.data())
    }
}

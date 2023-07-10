import type { Product } from "../domain/products/Product"

export interface ProductLoadResponse {
    products: Product[]
}

export interface ProductDatabaseConnector {
    loadProducts() : Promise<ProductLoadResponse>
}
export interface ProductLoadResponse {
    products: Product[]
}

export interface ProductDatabaseConnector {
    async loadProducts() : Promise<ProductLoadResponse>
}
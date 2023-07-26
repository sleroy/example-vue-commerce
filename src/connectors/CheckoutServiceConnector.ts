import type { ProductData } from "../domain/products/Product"

export interface CheckoutRequest {
    products: ProductData[]
    user: string
}

export interface CheckoutResponse {
    success: boolean
}

export interface CheckoutServiceConnector {
    checkout(request: CheckoutRequest): Promise<CheckoutResponse>,
    subscribe(cb : (event: any) => unknown ): void
}
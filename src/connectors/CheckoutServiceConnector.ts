import type { Product } from "../domain/products/Product"

export interface CheckoutRequest {
    products: Product[]
    user: string
}

export interface CheckoutResponse {
    success: boolean
}

export interface CheckoutServiceConnector {
    checkout(request: CheckoutRequest): Promise<CheckoutResponse>
}
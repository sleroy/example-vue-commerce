import type { SystemInfo } from "./SystemInfo";
import type { UserInfo } from "./UserInfo";
import type { Product } from './products/Product';

export interface ECommerceState {
    products: Product[],
    userInfo: UserInfo,
    systemInfo: SystemInfo,
    getProductById(string): Product
} 
import type { SystemInfo } from "./systeminfo/SystemInfo";
import type { UserInfo } from "./userinfo/UserInfo";
import type { Product } from './products/Product';

export interface ECommerceState {
    features: string[],
    products: Product[],
    userInfo: UserInfo,
    systemInfo: SystemInfo
} 
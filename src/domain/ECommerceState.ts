import type { SystemInfo } from "./systeminfo/SystemInfo";
import  { Product } from './products/Product';

export interface ECommerceState {
    features: string[],
    products: Product[],
    systemInfo: SystemInfo
} 
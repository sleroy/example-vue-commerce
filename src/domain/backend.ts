import { SystemInfoRepository } from './systeminfo/SystemInfoRepository';
import { UserInfoRepository } from './userinfo/UserInfoRepository';
import { ProductRepository } from './products/ProductRepository';
import { CheckoutRepository } from './checkout/CheckoutRepository';
import { AuthenticationService } from './authentication/AuthenticationService';

export const systemInfoRepo = new SystemInfoRepository()
export const userInfoRepo = new UserInfoRepository()
export const productRepo = new ProductRepository()
export const checkoutRepository = new CheckoutRepository()
export const authService = new AuthenticationService(userInfoRepo, systemInfoRepo);

export interface IBackend {
    system: SystemInfoRepository,
    user: UserInfoRepository,
    products: ProductRepository,
    checkouts: CheckoutRepository,
    auth: AuthenticationService
}

export const backend: IBackend = {
    system: systemInfoRepo,
    user: userInfoRepo,
    products: productRepo,
    checkouts: checkoutRepository,
    auth: authService
}





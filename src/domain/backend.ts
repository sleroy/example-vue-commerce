import { SystemInfoRepository } from './systeminfo/SystemInfoRepository';
import { UserInfoRepository } from './userinfo/UserInfoRepository';
import { ProductRepository } from './products/ProductRepository';
import { CheckoutRepository } from './checkout/CheckoutRepository';
import { AuthenticationService } from './authentication/AuthenticationService';
import { obtainCheckout, obtainProductDB } from '@/adapters/AdapterStrategy';

export interface IBackend {
    system: SystemInfoRepository,
    user: UserInfoRepository,
    products: ProductRepository,
    checkouts: CheckoutRepository,
    auth: AuthenticationService
}

class Backend implements IBackend {    
    public system: SystemInfoRepository
    public user: UserInfoRepository
    public products: ProductRepository
    public checkouts: CheckoutRepository
    public auth: AuthenticationService


    constructor() {
        this.init(['memory'])
    }

    init(features: string[]) {

        const checkoutDB = obtainCheckout(features)
        const productDB = obtainProductDB(features)

        this.system =  new SystemInfoRepository()
        this.user = new UserInfoRepository()
        this.products = new ProductRepository(productDB)
        this.checkouts = new CheckoutRepository(checkoutDB)
        this.auth = new AuthenticationService(this.user, this.system);

        return this
    }

    
}

export const backend = new Backend().init(['memory'])





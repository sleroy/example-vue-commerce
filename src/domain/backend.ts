import { SystemInfoRepository } from './systeminfo/SystemInfoRepository';
import { UserInfoRepository } from './userinfo/UserInfoRepository';
import { ProductRepository } from './products/ProductRepository';
import { CheckoutRepository } from './checkout/CheckoutRepository';
import { AuthenticationService } from './authentication/AuthenticationService';
import { obtainAuthentication, obtainCheckout, obtainProductDB, obtainRemoteNotifications } from '@/adapters/AdapterStrategy';

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
        console.log("\u{23F0} Loading Backend with ", {f: features.map((s:string) => s)})
        const checkoutDB = obtainCheckout(features)
        const productDB = obtainProductDB(features)
        const authConnector = obtainAuthentication(features)
        const remoteNotificationConnector = obtainRemoteNotifications(features)

        this.system =  new SystemInfoRepository(remoteNotificationConnector)
        this.user = new UserInfoRepository()
        this.products = new ProductRepository(productDB)
        this.checkouts = new CheckoutRepository(checkoutDB)
        this.auth = new AuthenticationService(this.user, this.system, authConnector);

        return this
    }    
}

export const backend = new Backend()





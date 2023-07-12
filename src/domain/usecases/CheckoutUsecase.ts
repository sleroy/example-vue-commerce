import type { Usecase } from './types';
import { SystemInfoRepository } from '../systeminfo/SystemInfoRepository';
import { UserInfoRepository } from '../userinfo/UserInfoRepository';
import { useCommerceStore } from '../../stores/commerce';
import { obtainCheckout } from '../../adapters/AdapterStrategy';
import type { CheckoutRequest, CheckoutServiceConnector } from '../../connectors/CheckoutServiceConnector';
import { ProductRepository } from '../products/ProductRepository';

export class CheckoutUsecase implements Usecase {

    private checkoutConnector: CheckoutServiceConnector

    constructor(private systemInfoRepository: SystemInfoRepository,
        private userInfoRepo: UserInfoRepository,
        private productRepo: ProductRepository) {
        const store = useCommerceStore()
        this.checkoutConnector = obtainCheckout(store.features)

    }

    async execute(): Promise<boolean> {
        if (this.userInfoRepo.isUserLoggedIn()) {
            try {
                const request: CheckoutRequest = {
                    products: this.productRepo.getCart(),
                    user: this.userInfoRepo.getUserName()
                }
                const res = await this.checkoutConnector.checkout(request)
                if (res.success) {
                    this.productRepo.clearCart()
                }
                return Promise.resolve(res.success);
            } catch (e) {
                console.error("Cannot perform the checkout", e)
                return Promise.reject({ msg: "Cannot perform the checkout ", error: e })
            }
        } else {

            this.systemInfoRepository.showCheckoutModal(false)
            this.systemInfoRepository.showSigninModal(true)
        }
        return false;
    }

}
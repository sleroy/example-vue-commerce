import { useCommerceStore } from '@/stores/commerce'
import { obtainRemoteNotifications } from '../../adapters/AdapterStrategy';

export class SystemInfoRepository {

    constructor() {
    }

    get store() {
        return useCommerceStore();
    }

    requireCheckout(): boolean {
        console.log("Checkout required", this.store.systemInfo.checkoutRequired)
        return this.store.systemInfo.checkoutRequired;
    }

    setCheckoutRequired(option: boolean) {
        this.store.systemInfo.checkoutRequired = option;
    }

    isOpenedLoginModal() {
        return this.store.systemInfo.openLoginModal;
    }

    isOpenedSigninModal() {
        return this.store.systemInfo.openSigninModal;
    }

    isOpenedSignupModal() {
        return this.store.systemInfo.openSignupModal;
    }

    isOpenedCheckoutModal() {
        return this.store.systemInfo.openCheckoutModal;
    }

    showLoginModal(show: boolean) {
        this.store.systemInfo.openLoginModal = show;
    }


    showSigninModal(show: boolean) {
        this.store.systemInfo.openSigninModal = show;
    }

    showSignupModal(show: boolean) {
        this.store.systemInfo.openSignupModal = show;
    }

    showCheckoutModal(show: boolean) {
        this.store.systemInfo.openCheckoutModal = show;
    }

    enableNotifications() {
        obtainRemoteNotifications(this._store.features).enableNotifications()
    }

}
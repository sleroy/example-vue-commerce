import { useCommerceStore } from '@/stores/commerce'
import { obtainRemoteNotifications } from '../../adapters/AdapterStrategy';

export class SystemInfoRepository {

    private _store: ReturnType<typeof useCommerceStore>;

    constructor() {
        this._store = useCommerceStore();
    }

    get store() {
        return this._store;
    }

    requireCheckout(): boolean {
        console.log("Checkout required", this._store.systemInfo.checkoutRequired)
        return this._store.systemInfo.checkoutRequired;
    }

    setCheckoutRequired(option: boolean) {
        this._store.systemInfo.checkoutRequired = option;
    }




    isOpenedLoginModal() {
        return this._store.systemInfo.openLoginModal;
    }

    isOpenedSigninModal() {
        return this._store.systemInfo.openSigninModal;
    }

    isOpenedSignupModal() {
        return this._store.systemInfo.openSignupModal;
    }

    isOpenedCheckoutModal() {
        return this._store.systemInfo.openCheckoutModal;
    }

    showLoginModal(show: boolean) {
        this._store.systemInfo.openLoginModal = show;
    }


    showSigninModal(show: boolean) {
        this._store.systemInfo.openSigninModal = show;
    }

    showSignupModal(show: boolean) {
        this._store.systemInfo.openSignupModal = show;
    }

    showCheckoutModal(show: boolean) {
        this._store.systemInfo.openCheckoutModal = show;
    }

    enableNotifications() {
        obtainRemoteNotifications(this._store.features).enableNotifications()
    }

}
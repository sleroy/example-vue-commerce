import { useCommerceStore } from '@/stores/commerce'

export class SystemInfoRepository {
    private _store: ReturnType<typeof useCommerceStore>;

    constructor() {
        this._store = useCommerceStore();
    }

    get store() {
        return this._store;
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

}
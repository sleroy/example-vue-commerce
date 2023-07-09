import { useCommerceStore } from '@/stores/commerce.ts'

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

    isOpenedSignupModal() {
        return this._store.systemInfo.openSignupModal;
    }

    isOpenedCheckoutModal() {
        return this._store.systemInfo.openCheckoutModal;
    }

    showLoginModal(show: boolean) {
        this._store.systemInfo.openLoginModal = show;
    }

    showSignupModal(show: boolean) {
        this._store.systemInfo.openSignupModal = show;
    }

    showCheckoutModal(show: boolean) {
        this._store.systemInfo.openCheckoutModal = show;
    }

}
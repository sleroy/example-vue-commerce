import { useCommerceStore } from '@/stores/commerce.ts'

export class SystemInfoRepository {
    private _store: ReturnType<typeof useCommerceStore>;

    constructor() {
        this._store = useCommerceStore();
    }

    get store() {
        return this._store;
    }

    showLoginModal(show) {        
        this._store.systemInfo.openLoginModal = show;
    }

    showSignupModal(show) {
        this._store.systemInfo.openSignupModal = show;
    }

    showCheckoutModal(show) {
        this._store.systemInfo.openCheckoutModal = show;
    }

}
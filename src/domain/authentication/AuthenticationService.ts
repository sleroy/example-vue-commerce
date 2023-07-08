import { useCommerceStore } from '@/stores/commerce.ts'

export class AuthenticationService {
    private _store: ReturnType<typeof useCommerceStore>;

    constructor() {
        this._store = useCommerceStore();
    }

    get store() {
        return this._store;
    }


}
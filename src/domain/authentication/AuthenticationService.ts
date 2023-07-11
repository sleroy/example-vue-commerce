import { useCommerceStore } from '@/stores/commerce'
import { obtainAuthentication } from '../../adapters/AdapterStrategy';
import { AuthenticationConnector } from '../../connectors/AuthenticationConnector';

export class AuthenticationService {
    private _store: ReturnType<typeof useCommerceStore>;
    auth: AuthenticationConnector

    constructor() {
        this._store = useCommerceStore();
        this.auth = obtainAuthentication(this._store.features)          
    }

    get store() {
        return this._store;
    }

    signin(): boolean {
        return this.auth.signin();
    }

}
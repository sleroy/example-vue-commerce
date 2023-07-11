import { obtainAuthentication } from '../../adapters/AdapterStrategy';
import { useCommerceStore } from '../../stores/commerce';
import type { Usecase } from './types';
import { ECommerceState } from '../ECommerceState';
import { AuthenticationConnector } from '../../connectors/AuthenticationConnector';
import { AuthenticationService } from '../authentication/AuthenticationService';

export class UserSigninUsecase implements Usecase {
    private _store: ECommerceState;

    constructor(private authService : AuthenticationService) {

    }

    execute() {
        this._store = useCommerceStore();
        return this.authService.signin();        
    }

}
import { ProductRepository } from '../products/ProductRepository';
import type { Usecase } from './types';
import type { UserInfoRepository } from '../userinfo/UserInfoRepository';
import type { SystemInfoRepository } from '../systeminfo/SystemInfoRepository';
import { backend } from '../backend';

export class LoadApiUsecase implements Usecase {
    constructor(private productRepo: ProductRepository,
        private userInfo: UserInfoRepository,
        private system: SystemInfoRepository) {

    }

    execute(...features: string[]) {
        // 
        console.log("Initialization of the API")
        backend.init(this.system.features)

        this.productRepo.load();

        if (this.userInfo.isUserLoggedIn()) {
            this.system.showSigninUserPasswordModal(false)
            this.system.showSigninModal(false)
        }
    }

}
import type { Usecase } from './types';
import { SystemInfoRepository } from '../systeminfo/SystemInfoRepository';
import { UserInfoRepository } from '../userinfo/UserInfoRepository';

export class CheckoutUsecase implements Usecase {

    constructor(private systemInfoRepository: SystemInfoRepository,
        private userInfoRepository: UserInfoRepository) {

    }

    execute(): boolean {
        if (this.userInfo.isUserLoggedIn()) {
            return true;
        } else {
            
            this.systemInfoRepository.showCheckoutModal(false)
            this.systemInfoRepository.showLoginModal(true)
        }
        return false;
    }

}
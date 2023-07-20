import { ProductRepository } from '../products/ProductRepository';
import { SystemInfoRepository } from '../systeminfo/SystemInfoRepository';
import { UserInfoRepository } from '../userinfo/UserInfoRepository';
import type { Usecase } from './types';
import { useRouter, useRoute } from 'vue-router'

// Access to the router
const router = useRouter()


export class UserLogoutUsecase implements Usecase {
    constructor(private systemInfoRepository: SystemInfoRepository,
        private userInfoRepository: UserInfoRepository,
        private productRepository: ProductRepository) {

    }

    execute() {
        this.userInfoRepository.setUserLoggedIn(false)
        this.userInfoRepository.setUserSignedUp(false)
        this.productRepository.removeProductsFromFavourite();
      
        // redirect to homepage
        router.push({ name: 'index' });
    }

}
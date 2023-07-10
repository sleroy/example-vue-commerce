import type { Usecase } from './types';
import { ProductRepository } from '../products/ProductRepository';
import type { Product } from '../products/Product';
import { UserInfoRepository } from '../userinfo/UserInfoRepository';
import { SystemInfoRepository } from '../systeminfo/SystemInfoRepository';

export class SaveToFavoriteProductUsecase implements Usecase {

    constructor(private productRepo: ProductRepository, private systemInfoRepo: SystemInfoRepository, private userInfo: UserInfoRepository) {

    }

    execute(id: number) {
        let isUserLogged = this.userInfo.isUserLoggedIn();
        if (isUserLogged) {
          this.productRepo.addToFavourite(id);
        } else {
          this.systemInfoRepo.showLoginModal(true);
        }
    }

}
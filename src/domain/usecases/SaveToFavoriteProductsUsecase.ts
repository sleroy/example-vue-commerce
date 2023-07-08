import type { Usecase } from './types';
import { ProductRepository } from '../products/ProductRepository';
import type { Product } from '../products/Product';
import { UserInfoRepository } from '../userinfo/UserInfoRepository';

export class SaveToFavoriteProductUsecase implements Usecase {

    constructor(private productRepo: ProductRepository, private systemInfoRepo: SystemInfo, private userInfo: UserInfoRepository) {

    }

    execute(...params) {
        let isUserLogged = this.userInfo.isLoggedIn;

        if (isUserLogged) {
          this.productRepo.addToFavourite(id);
        } else {
          this.systemInfoRepo.showLoginModal(true);
        }
    }

}
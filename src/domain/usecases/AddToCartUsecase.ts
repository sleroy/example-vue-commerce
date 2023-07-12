import type { Usecase } from './types';
import { ProductRepository } from '../products/ProductRepository';
import { SystemInfoRepository } from '../systeminfo/SystemInfoRepository';

export class AddToCartUsecase implements Usecase {

    constructor(private productRepo: ProductRepository,
        private systemInfoRepository: SystemInfoRepository) {

    }

    execute(id: string) {
        let data = {
            id: id,
            status: true
        }
        this.productRepo.addToCart(id);
        this.productRepo.setAddedBtn(data);
        this.systemInfoRepository.setCheckoutRequired(true)
    }

}
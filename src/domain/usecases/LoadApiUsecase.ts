import { Events, eventbus } from '../eventBus';
import { ProductRepository } from '../products/ProductRepository';
import type { Usecase } from './types';
import { CheckoutRepository } from '../checkout/CheckoutRepository';

export class LoadApiUsecase implements Usecase {
    constructor(private productRepo: ProductRepository,
        private checkoutRepo: CheckoutRepository) {

    }

    execute() {
        // 
        console.log("Initialization of the API")
        this.productRepo.load();
    
    }

}
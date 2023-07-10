import type { Usecase } from './types';
import { ProductRepository } from '../products/ProductRepository';
import type { Product } from '../products/Product';

export class RemoveFromCartUsecase implements Usecase {

    constructor(private productRepo: ProductRepository) {

    }

    execute(id: number) {
        let data = {
            id: id,
            status: false
        }
        this.productRepo.removeFromCart(id);
        this.productRepo.setAddedBtn(data);
    }

}
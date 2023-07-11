import type { Usecase } from './types';
import { ProductRepository } from '../products/ProductRepository';
import type { Product } from '../products/Product';

export class AddToCartUsecase implements Usecase {

    constructor(private productRepo: ProductRepository) {

    }

    execute(id: string) {
        let data = {
            id: id,
            status: true
        }
        this.productRepo.addToCart(id);
        this.productRepo.setAddedBtn(data);
    }

}
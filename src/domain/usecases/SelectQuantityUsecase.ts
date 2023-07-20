import type { Usecase } from './types';
import { ProductRepository } from '../products/ProductRepository';
import  { Product } from '../products/Product';

export class SelectQuantityUsecase implements Usecase {

    constructor(private productRepo: ProductRepository) {

    }

    execute(id: string, selected: number) {
        let data = {
            id: id,
            quantity: selected
        }
        this.productRepo.setQuantity(data);
    }

}
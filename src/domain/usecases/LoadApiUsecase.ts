import { ProductRepository } from '../products/ProductRepository';
import type { Usecase } from './types';

export class LoadApiUsecase implements Usecase {

    constructor(private productRepo: ProductRepository) {

    }

    execute() {
        this.productRepo.load();
    }

}
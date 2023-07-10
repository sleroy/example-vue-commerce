import type { Usecase } from './types';
import { ProductRepository } from '../products/ProductRepository';
import type { Product } from '../products/Product';

export class RemoveFromFavoriteProductUsecase implements Usecase {

    constructor(private productRepo: ProductRepository) {

    }

    execute(id: number) {
        this.productRepo.removeFromFavourite(id); 
    }

}
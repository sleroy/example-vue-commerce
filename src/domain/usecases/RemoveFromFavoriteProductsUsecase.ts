import type { Usecase } from './types';
import { ProductRepository } from '../products/ProductRepository';
import  { Product } from '../products/Product';

export class RemoveFromFavoriteProductUsecase implements Usecase {

    constructor(private productRepo: ProductRepository) {

    }

    execute(id: string) {
        this.productRepo.removeFromFavourite(id); 
    }

}
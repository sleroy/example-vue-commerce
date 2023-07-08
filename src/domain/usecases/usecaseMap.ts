import { OpenProductDetailUsecase } from './OpenProductDetailUsecase';
import { UserLoginUsecase } from './UserLoginUsecase';
import { UserLogoutUsecase } from './UserLogoutUsecase';
import { SearchProductUsecase } from './SearchProductUsecase';
import { UserInfoRepository } from '../userinfo/UserInfoRepository';
import { AddToCartUsecase } from './AddToCartUsecase';
import { ProductRepository } from '../products/ProductRepository';
import { RemoveFromCartUsecase } from './RemoveFromCartUsecase';
import { SaveToFavoriteProductUsecase } from './SaveToFavoriteProductsUsecase';
import { SystemInfoRepository } from '../systeminfo/SystemInfoRepository';
import { SelectQuantityUsecase } from './SelectQuantityUsecase';
import { RemoveFromFavoriteProductUsecase } from './RemoveFromFavoriteProductsUsecase';

const usecaseMapping = {
    'open-product-detail' : () => new OpenProductDetailUsecase(),
    'login' : () => new UserLoginUsecase(),
    'logout' : () => new UserLogoutUsecase(),
    'search-product' : () => new SearchProductUsecase(new UserInfoRepository()),
    'add-to-cart' : () => new AddToCartUsecase(new ProductRepository()),
    'remove-from-cart' : () => new RemoveFromCartUsecase(new ProductRepository()),
    'save-to-favorite' : () => new SaveToFavoriteProductUsecase(new ProductRepository(), new SystemInfoRepository(), new UserInfoRepository()),
    'remove-from-favorite' : () => new RemoveFromFavoriteProductUsecase(new ProductRepository(), new SystemInfoRepository()),
    'select-quantity' : () => new SelectQuantityUsecase(new ProductRepository(), new SystemInfoRepository()),
}

export function usecase(usecaseId: string) {
    return usecaseMapping[usecaseId]();
}
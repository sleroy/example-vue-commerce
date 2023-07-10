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
import { SignupUsecase } from './SignupUsecase';
import { CheckoutUsecase } from './CheckoutUsecase';
import { RemoveFromFavoriteProductUsecase } from './RemoveFromFavoriteProductsUsecase';
import { LoadApiUsecase } from './LoadApiUsecase';



const usecaseMapping = (systemInfoRepo: SystemInfoRepository, userInfoRepo: UserInfoRepository, productRepo: ProductRepository) => {
    return {
        'open-product-detail': () => new OpenProductDetailUsecase(),
        'login': () => new UserLoginUsecase(),
        'logout': () => new UserLogoutUsecase(systemInfoRepo, userInfoRepo, productRepo),
        'signup': () => new SignupUsecase(userInfoRepo),
        'checkout': () => new CheckoutUsecase(systemInfoRepo, userInfoRepo),
        'search-product': () => new SearchProductUsecase(userInfoRepo),
        'add-to-cart': () => new AddToCartUsecase(productRepo),
        'remove-from-cart': () => new RemoveFromCartUsecase(productRepo),
        'save-to-favorite': () => new SaveToFavoriteProductUsecase(productRepo, systemInfoRepo, userInfoRepo),
        'remove-from-favorite': () => new RemoveFromFavoriteProductUsecase(productRepo),
        'select-quantity': () => new SelectQuantityUsecase(productRepo),
        'load-api': () => new LoadApiUsecase(productRepo),
    }
}

export function usecase(usecaseId: string) {
    const systemInfoRepo = new SystemInfoRepository()
    const userInfoRepo = new UserInfoRepository()
    const productRepo = new ProductRepository()
    const selectedUsecaseMap: Record<string, any> = usecaseMapping(systemInfoRepo, userInfoRepo, productRepo);
    
    if (!selectedUsecaseMap[usecaseId]) {
        throw new Error(`Usecase ${usecaseId} not found`)
    }

    return selectedUsecaseMap[usecaseId];
}
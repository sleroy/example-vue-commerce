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



const usecaseMapping = {
    'open-product-detail' : () => new OpenProductDetailUsecase(),
    'login' : () => new UserLoginUsecase(),
    'logout' : () => new UserLogoutUsecase(),
    'signup' : () => new SignupUsecase(),
    'checkout' : (systemInfoRepo, userInfoRepo, productRepo) => new CheckoutUsecase(systemInfoRepo, userInfoRepo),
    'search-product' : (systemInfoRepo, userInfoRepo, productRepo) => new SearchProductUsecase(userInfoRepo),
    'add-to-cart' : (systemInfoRepo, userInfoRepo, productRepo) => new AddToCartUsecase(productRepo),
    'remove-from-cart' : (systemInfoRepo, userInfoRepo, productRepo) => new RemoveFromCartUsecase(productRepo),
    'save-to-favorite' : (systemInfoRepo, userInfoRepo, productRepo) => new SaveToFavoriteProductUsecase(productRepo, systemInfoRepo, userInfoRepo),
    'remove-from-favorite' : (systemInfoRepo, userInfoRepo, productRepo) => new RemoveFromFavoriteProductUsecase(productRepo, systemInfoRepo),
    'select-quantity' : (systemInfoRepo, userInfoRepo, productRepo) => new SelectQuantityUsecase(productRepo, systemInfoRepo),
    'load-api': (systemInfoRepo, userInfoRepo, productRepo) => new LoadApiUsecase(productRepo),
}

export function usecase(usecaseId: string) {
    const systemInfoRepo = new SystemInfoRepository();
    const userInfoRepo = new UserInfoRepository()
    const productRepo = new ProductRepository()
    const selectedUsecase = usecaseMapping[usecaseId];
    if (!selectedUsecase) {
        throw new Error(`Usecase ${usecaseId} not found`)
    }

    return selectedUsecase(systemInfoRepo, userInfoRepo, productRepo);
}
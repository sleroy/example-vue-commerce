import { OpenProductDetailUsecase } from './OpenProductDetailUsecase'
import { UserLogoutUsecase } from './UserLogoutUsecase'
import { SearchProductUsecase } from './SearchProductUsecase'
import { AddToCartUsecase } from './AddToCartUsecase'
import { RemoveFromCartUsecase } from './RemoveFromCartUsecase'
import { SaveToFavoriteProductUsecase } from './SaveToFavoriteProductsUsecase'
import { SelectQuantityUsecase } from './SelectQuantityUsecase'
import { SignupUsecase } from './SignupUsecase'
import { CheckoutUsecase } from './CheckoutUsecase'
import { RemoveFromFavoriteProductUsecase } from './RemoveFromFavoriteProductsUsecase'
import { LoadApiUsecase } from './LoadApiUsecase'
import { UserSigninUsecase } from './UserSigninUsecase'
import { UserSigninWithPasswordUsecase } from './UserSigninWithPassword';
import { backend, type IBackend } from '../backend'

const usecaseMapping = (backend:IBackend
) => {
  return {
    'open-product-detail': () => new OpenProductDetailUsecase(),
    signin: () => new UserSigninUsecase(backend.auth, backend.user, backend.system),
    'signin-password': () => new UserSigninWithPasswordUsecase(backend.auth, backend.user, backend.system),
    logout: () => new UserLogoutUsecase(backend.system, backend.user, backend.products),
    signup: () => new SignupUsecase(backend.user),
    'go-to-signup': () => new SignupUsecase(backend.user),
    checkout: () => new CheckoutUsecase(backend.system, backend.user, backend.products),
    'search-product': () => new SearchProductUsecase(backend.user),
    'add-to-cart': () => new AddToCartUsecase(backend.products, backend.system),
    'remove-from-cart': () => new RemoveFromCartUsecase(backend.products, backend.system),
    'save-to-favorite': () => new SaveToFavoriteProductUsecase(backend.products, backend.system, backend.user),
    'remove-from-favorite': () => new RemoveFromFavoriteProductUsecase(backend.products),
    'select-quantity': () => new SelectQuantityUsecase(backend.products),
    'load-api': () => new LoadApiUsecase(backend.products, backend.user, backend.system),
  }
}

export function usecase(usecaseId: string) {
  const selectedUsecaseMap: Record<string, any> = usecaseMapping(backend)

  const usecaseFactory = selectedUsecaseMap[usecaseId]
  if (!usecaseFactory) {
    throw new Error(`Usecase ${usecaseId} not found`)
  }

  return usecaseFactory()
}

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ECommerceState } from '@/domain/ECommerceState';
import type { Product } from '../domain/products/Product';

export const useCommerceStore = defineStore('commerce', {
  state: (): ECommerceState => ({
    // memory implementation = demo
    // firebase implementation 
    // amplify implementation
    // supbase implementation
    features: ['firebase'],
    products: [
    ],
    userInfo: {
      isLoggedIn: false,
      isSignedUp: false,
      hasSearched: false,
      name: '',
      productTitleSearched: '',
      token: undefined
    },
    systemInfo: {
      openLoginModal: false,
      openSigninModal: false,
      openSignupModal: false,
      openCheckoutModal: false,
      checkoutRequired: false
    }
  }),
  getters: {
  },
  actions: {
    setUserLoggedIn(isUserLoggedIn: boolean) {
      this.userInfo.isLoggedIn = isUserLoggedIn;
    },
    setUserSignedUp(isSignedUp: boolean) {
      this.userInfo.isSignedUp = isSignedUp;
    },
    setHasUserSearched(hasSearched: boolean) {
      this.userInfo.hasSearched = hasSearched;
    },
    setUserName(name: string) {
      this.userInfo.name = name;
    },
    setProductTitleSearched(titleSearched: string) {
      this.userInfo.productTitleSearched = titleSearched;
    },

    loadProducts(allProducts: Product[]) {
      this.products = allProducts
    }


  }
})


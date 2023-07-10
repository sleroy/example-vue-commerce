import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ECommerceState } from '@/domain/ECommerceState';
import type { Product } from '../domain/products/Product';

export const useCommerceStore = defineStore('commerce', {
  state: (): ECommerceState => ({
    features: ['firebase'],
    products: [
    ],
    userInfo: {
      isLoggedIn: false,
      isSignedUp: false,
      hasSearched: false,
      name: '',
      productTitleSearched: ''
    },
    systemInfo: {
      openLoginModal: false,
      openSignupModal: false,
      openCheckoutModal: false
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


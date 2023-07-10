import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ECommerceState } from '@/domain/ECommerceState';
import type { Product } from '../domain/products/Product';

export const useCommerceStore = defineStore('commerce', {
  state: (): ECommerceState => ({
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
    setUserLoggedIn(isUserLoggedIn) {
      this.userInfo.isLoggedIn = isUserLoggedIn;
    },
    setUserSignedUp(isSignedUp) {
      this.userInfo.isSignedUp = isSignedUp;
    },
    setHasUserSearched(hasSearched) {
      this.userInfo.hasSearched = hasSearched;
    },
    setUserName(name) {
      this.userInfo.name = name;
    },
    setProductTitleSearched(titleSearched) {
      this.userInfo.productTitleSearched = titleSearched;
    },
  
    SET_USER(authUser) {
      this.authUser = authUser
    },

    loadProducts(allProducts: Product[]) {
      this.products = allProducts
    }


  }
})


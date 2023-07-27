import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ECommerceState } from '@/domain/ECommerceState';
import  { Product } from '../domain/products/Product';

export const useCommerceStore = defineStore('commerce', {
  state: (): ECommerceState => ({
    // memory implementation = demo
    // firebase implementation 
    // amplify implementation
    // supbase implementation
    features: ['firebase'],
    products: [
    ],
    systemInfo: {
      openSigninUserPasswordModal: false,
      openSigninModal: false,
      openSignupModal: false,
      openCheckoutModal: false,
      checkoutRequired: false,
      hasSearched: false,
      productTitleSearched: ""
    }
  }),
  getters: {
  },
  actions: {
    loadProducts(allProducts: Product[]) {
      this.products = allProducts
    }
  }
})


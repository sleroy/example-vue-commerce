import { useCommerceStore } from '@/stores/commerce'
import { type Token } from '../authentication/Token'

export class UserInfoRepository {

  constructor() {
  }

  get store() {
    return useCommerceStore()
  }

  getProductTitleSearched() {
    return this.store.userInfo.productTitleSearched
  }

  hasSearched() {
    return this.store.userInfo.hasSearched
  }

  hasToken() {
    return this.store.userInfo && this.store.userInfo.token;
  }

  isUserLoggedIn() {
    return this.store.userInfo.isLoggedIn
  }
  isUserSignedUp() {
    return this.store.userInfo.isSignedUp
  }
  getUserName() {
    return this.store.userInfo.name
  }

  getUserNameOrDefault() {
    let name = this.getUserName()
    if (name === '') {
      return 'user'
    } else {
      return name
    }
  }

  setUserLoggedIn(isUserLoggedIn: boolean) {
    this.store.userInfo.isLoggedIn = isUserLoggedIn
  }
  setUserSignedUp(isSignedUp: boolean) {
    this.store.userInfo.isSignedUp = isSignedUp
  }
  setHasUserSearched(hasSearched: boolean) {
    this.store.userInfo.hasSearched = hasSearched
  }
  setUserName(name: string) {
    this.store.userInfo.name = name
  }
  setProductTitleSearched(titleSearched: string) {
    this.store.userInfo.productTitleSearched = titleSearched
  }
  storeToken(token: Token) {
    this.store.userInfo.token = token
  }
}

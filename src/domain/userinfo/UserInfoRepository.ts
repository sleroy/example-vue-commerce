import { useCommerceStore } from '@/stores/commerce'
import { type Token } from '../authentication/Token'

export class UserInfoRepository {

  constructor(private localStorage: Storage) {

  }

  get store() {
    return useCommerceStore()
  }

  saveStorage() {
    localStorage.setItem('isLoggedIn', this.store.userInfo.isLoggedIn.toString())
    localStorage.setItem('isSignedUp', this.store.userInfo.isSignedUp.toString())
    localStorage.setItem('name', this.store.userInfo.name.toString())

  }

  readStorage() {
    this.store.userInfo.isLoggedIn = this.localStorage.getItem("isLoggedIn") == "true"
    this.store.userInfo.isSignedUp = this.localStorage.getItem("isSignedUp") == "true"
    this.store.userInfo.name = this.localStorage.getItem("name") || ""
  }


  isUserLoggedIn(): boolean {
    return this.store.userInfo.isLoggedIn
  }
  isUserSignedUp(): boolean {
    return this.store.userInfo.isSignedUp
  }
  getUserName(): string {
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
    this.saveStorage()
    this.store.userInfo.isLoggedIn = isUserLoggedIn
  }
  setUserSignedUp(isSignedUp: boolean) {
    this.saveStorage()
    this.store.userInfo.isSignedUp= isSignedUp

  }

  setUserName(name: string) {
    this.saveStorage()
    this.store.userInfo.name = name
  }


}

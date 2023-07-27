import { useCommerceStore } from '@/stores/commerce'
import { type Token } from '../authentication/Token'

export class UserInfoRepository {

  constructor() {
  }

  get store() {
    return useCommerceStore()
  }


  isUserLoggedIn():boolean {
    // convert string to boolean
    return localStorage.getItem("isLoggedIn") == "true"
  }
  isUserSignedUp():boolean {
    return localStorage.getItem("isSignedUp") == "true"
  }
  getUserName():string {
    return localStorage.getItem("name") || ""
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
    localStorage.setItem('isLoggedIn', isUserLoggedIn.toString())
  }
  setUserSignedUp(isSignedUp: boolean) {
    localStorage.setItem('isSignedUp', isSignedUp.toString())
  }
  
  setUserName(name: string) {
    localStorage.setItem('name', name.toString())
  }


}

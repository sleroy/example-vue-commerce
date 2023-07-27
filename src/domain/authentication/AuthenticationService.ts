import { useCommerceStore } from '@/stores/commerce'
import {
  type AuthenticationConnector,
  type SigninResponse,
  type SignupResponse
} from '../../connectors/AuthenticationConnector'
import { UserInfoRepository } from '../userinfo/UserInfoRepository'
import { SystemInfoRepository } from '../systeminfo/SystemInfoRepository'
import { eventbus } from '../eventBus'
import type { Emitter, EventType } from 'mitt'


export class AuthenticationService {
  onCustomOAuthStateEventReceived(e: any) {
      throw new Error("Method not implemented.")
  }
  onSignoutEventReceived(e: any) {
      throw new Error("Method not implemented.")
  }
  private eventBus: Emitter<Record<EventType, unknown>>

  constructor(
    private userInfo: UserInfoRepository,
    private sysInfoRepo: SystemInfoRepository,
    private auth: AuthenticationConnector
  ) {
    this.eventBus = eventbus

  }
  onSigninEventReceived(e: SigninResponse) {
    console.log("Received sign in event", e)
    this.userInfo.setUserName(e.username)
    this.userInfo.setUserLoggedIn(true)
    this.sysInfoRepo.showSigninUserPasswordModal(false)
    this.sysInfoRepo.showSigninModal(false)
    this.sysInfoRepo.showSignupModal(false)
  }

  get store() {
    return useCommerceStore()
  }

  async signin(): Promise<unknown> {
    try {
      await this.auth.signin()      
    } catch (e) {
      console.error('Cannot signin for the reason : ', e)
      return Promise.reject(e)
    }
  }

  async passwordSignin(username: string, password: string): Promise<unknown> {
    try {
      const res = await this.auth.passwordSignin(username, password)      
      return res
    } catch (e) {
      console.error('Cannot authenticate with password for the reason : ', e)
      return Promise.reject(e)
    }
  }


  async signup(username:string, email: string, password: string): Promise<SignupResponse> {
    try {
      const res = await this.auth.signup(username, email, password)      
      return res
    } catch (e) {
      console.error('Cannot perform the sign up for the reason : ', e)
      return Promise.reject(e)
    }
  }
}

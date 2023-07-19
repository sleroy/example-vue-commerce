import { useCommerceStore } from '@/stores/commerce'
import {
  type AuthenticationConnector,
  type SigninResponse
} from '../../connectors/AuthenticationConnector'
import { UserInfoRepository } from '../userinfo/UserInfoRepository'
import { SystemInfoRepository } from '../systeminfo/SystemInfoRepository'

export class AuthenticationService {
  constructor(
    private userInfo: UserInfoRepository,
    private sysInfoRepo: SystemInfoRepository,
    private auth: AuthenticationConnector
  ) {}

  get store() {
    return useCommerceStore()
  }

  async signin(): Promise<SigninResponse> {
    try {
      const res = await this.auth.signin()
      if (res && res.success) {
        this.userInfo.setUserName(res.username)
        this.userInfo.storeToken(res.token)
      }
      return res
    } catch (e) {
      console.error('Cannot signin for the reason : ', e)
      return Promise.reject(e)
    }
  }

  async passwordSignin(username: string, password: string): Promise<SigninResponse> {
    try {
      const res = await this.auth.passwordSignin(username, password)
      if (res && res.success) {
        this.userInfo.setUserName(res.username)
        this.userInfo.storeToken(res.token)
      }
      return res
    } catch (e) {
      console.error('Cannot authentication with password for the reason : ', e)
      return Promise.reject(e)
    }
  }
}

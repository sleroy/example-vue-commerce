import { useCommerceStore } from '@/stores/commerce'
import { obtainAuthentication } from '../../adapters/AdapterStrategy'
import {
  type AuthenticationConnector,
  type SigninResponse
} from '../../connectors/AuthenticationConnector'
import { UserInfoRepository } from '../userinfo/UserInfoRepository'
import { SystemInfoRepository } from '../systeminfo/SystemInfoRepository'

export class AuthenticationService {
  private _store: ReturnType<typeof useCommerceStore>
  auth: AuthenticationConnector

  constructor(private userInfo: UserInfoRepository, private sysInfoRepo: SystemInfoRepository) {
    this._store = useCommerceStore()
    this.auth = obtainAuthentication(this._store.features)
    if (userInfo.hasToken()) {
      this.userInfo.setUserLoggedIn(true)
      this.sysInfoRepo.showLoginModal(false)
    }
  }

  get store() {
    return this._store
  }

  async signin(): Promise<SigninResponse> {
    try {
      const res = await this.auth.signin()
      if (res && res.success) {
        this.userInfo.storeToken(res.token)
      }
      return res
    } catch (e) {
      console.error('Cannot signin for the reason : ', e)
      return Promise.reject(e)
    }
  }
}

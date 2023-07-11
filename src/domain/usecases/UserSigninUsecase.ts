import { useCommerceStore } from '../../stores/commerce'
import type { Usecase } from './types'
import { type ECommerceState } from '../ECommerceState'
import { type SigninResponse } from '../../connectors/AuthenticationConnector'
import { AuthenticationService } from '../authentication/AuthenticationService'
import { UserInfoRepository } from '../userinfo/UserInfoRepository'
import { SystemInfoRepository } from '../systeminfo/SystemInfoRepository'

export class UserSigninUsecase implements Usecase {

  constructor(
    private authService: AuthenticationService,
    private userInfo: UserInfoRepository,
    private systemInfo: SystemInfoRepository
  ) {}

  async execute(): Promise<SigninResponse> {
    return this.authService.signin().then((res) => {
      if (res.success) {
        this.userInfo.setUserLoggedIn(true)
        this.systemInfo.showLoginModal(false)
      }
      return res
    })
  }
}

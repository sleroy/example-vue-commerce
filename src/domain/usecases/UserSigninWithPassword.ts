import { useCommerceStore } from '../../stores/commerce'
import type { Usecase } from './types'
import { type ECommerceState } from '../ECommerceState'
import { type SigninResponse } from '../../connectors/AuthenticationConnector'
import { AuthenticationService } from '../authentication/AuthenticationService'
import { UserInfoRepository } from '../userinfo/UserInfoRepository'
import { SystemInfoRepository } from '../systeminfo/SystemInfoRepository'
import { Events, eventbus } from '../eventBus'

export class UserSigninWithPasswordUsecase implements Usecase {

  constructor(
    private authService: AuthenticationService,
    private userInfo: UserInfoRepository,
    private systemInfo: SystemInfoRepository
  ) {}

  async execute(username: string, password:string): Promise<SigninResponse> {
    return this.authService.passwordSignin(username, password).then((res) => {
      if (res.success) {
        this.userInfo.setUserLoggedIn(true)
        this.systemInfo.showSigninModal(false)
        this.systemInfo.showLoginModal(false)
        eventbus.emit(Events.userSignin, this.userInfo.getUserName())
      }
      return res
    })
  }
}

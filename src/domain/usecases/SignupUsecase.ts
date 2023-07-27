import type { Usecase } from './types';
import { UserInfoRepository } from '../userinfo/UserInfoRepository';
import { isValidEmail } from '@/assets/validators'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import type { AuthenticationService } from '../authentication/AuthenticationService';
import type { SignupResponse } from '@/connectors/AuthenticationConnector';
import { toErrorWithMessage } from '../utils/errors';

export interface SignupForm {
  name: string,
  email: string,
  password: string,
  repeatPassword: string
}

export interface SignUpFormResponse {
  errorMessage: string;
  highlightEmailWithError: boolean,
  highlightPasswordWithError: boolean,
  highlightNameWithError: boolean,
  highlightRepeatPasswordWithError: boolean,
  isFormSuccess: boolean,
  emailNotValid: boolean
}

export class SignupUsecase implements Usecase {

  constructor(private userInfoRepository: UserInfoRepository,
    private authService: AuthenticationService) { }

  async execute(form: SignupForm): Promise<SignUpFormResponse> {
    const { name, email, password, repeatPassword } = form;

    const response: SignUpFormResponse = {
      errorMessage :"",
      highlightEmailWithError: false,
      highlightPasswordWithError: false,
      highlightNameWithError: false,
      highlightRepeatPasswordWithError: false,
      isFormSuccess: false,
      emailNotValid: false
    }

    if (name && email && password && repeatPassword) {
      response.highlightEmailWithError = false;
      response.highlightPasswordWithError = false;

      try {
        const r : SignupResponse = await this.authService.signup(name, email, password)
        response.isFormSuccess = true
      } catch (e) {        
        const errMsg = toErrorWithMessage(e);
        console.log("Usecase : cannot perform the sign up", { errMsg})
        response.highlightPasswordWithError = errMsg.message.includes("InvalidPasswordException")
        response.highlightRepeatPasswordWithError = response.highlightPasswordWithError
        response.errorMessage = errMsg.message        
      } finally {
        this.userInfoRepository.setUserName(name)
        this.userInfoRepository.setUserSignedUp(response.isFormSuccess)
      }

      return response;
    }

    if (!name) {
      response.highlightNameWithError = true;
    } else {
      response.highlightNameWithError = false;
    }

    if (!email) {
      response.highlightEmailWithError = true;

      if (email && !isValidEmail(email)) {
        response.emailNotValid = true
      }
    } else {
      response.highlightEmailWithError = false;
    }

    if (!password) {
      response.highlightPasswordWithError = true;
    } else {
      response.highlightPasswordWithError = false;
    }

    if (!repeatPassword) {
      response.highlightRepeatPasswordWithError = true;
    } else {
      response.highlightRepeatPasswordWithError = false;
    }
    return response
  }

}


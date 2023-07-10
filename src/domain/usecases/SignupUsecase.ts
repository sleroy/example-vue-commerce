import type { Usecase } from './types';
import { UserInfoRepository } from '../userinfo/UserInfoRepository';

export interface SignupForm  {
    name: string,
    email: string,
    password: string,
    repeatPassword: string
}

export interface SignUpResponse {
    highlightEmailWithError: false,
    highlightPasswordWithError : false,
    highlightNameWithError : false,
    highlightRepeatPasswordWithError: false,
    isFormSuccess : false,
    emailNotValid: false
}

export class SignupUsecase implements Usecase {

  constructor(private userInfoRepository: UserInfoRepository) { }

    execute(form: SignupForm)  {
        const {name, email, password, repeatPassword} = form;

        const response = {
            highlightEmailWithError: false,
            highlightPasswordWithError : false,
            highlightNameWithError : false,
            highlightRepeatPasswordWithError: false,
            isFormSuccess : false
        }

        if (name && email && password && repeatPassword) {
            response.highlightEmailWithError = false;
            response.highlightPasswordWithError = false;
            response.isFormSuccess = true;
            userInfoRepository.setUserName(name)
            userInfoRepository.setUserSignedUp(isFormSuccess)
            userInfoRepository.setUserLoggedIn(isFormSuccess)
        
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
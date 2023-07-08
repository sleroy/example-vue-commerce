import type { Usecase } from './types';
import { UserInfoRepository } from '../userinfo/UserInfoRepository';

export class SearchProductUsecase implements Usecase {

    constructor(private userRepository: UserInfoRepository) {
        
    }

    execute(...params : unknown) {
        const value: string = params[0];
        if (value.length > 0) {
            userRepository.setHasUserSearched(true);
            userRepository.setProductTitleSearched(value);
        } else {
            userRepository.setHasUserSearched(false);
            userRepository.setProductTitleSearched('');
        }   
    }

}
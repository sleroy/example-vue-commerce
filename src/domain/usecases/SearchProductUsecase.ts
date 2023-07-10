import type { Usecase } from './types';
import { UserInfoRepository } from '../userinfo/UserInfoRepository';

export class SearchProductUsecase implements Usecase {

    constructor(private userRepository: UserInfoRepository) {

    }

    execute(params: any[]) : unknown {
        const value: string = params[0];
        if (value.length > 0) {
            this.userRepository.setHasUserSearched(true);
            this.userRepository.setProductTitleSearched(value);
        } else {
            this.userRepository.setHasUserSearched(false);
            this.userRepository.setProductTitleSearched('');
        }
        return null;
    }

}
import type { Usecase } from './types';
import type { SystemInfoRepository } from '../systeminfo/SystemInfoRepository';

export class SearchProductUsecase implements Usecase {

    constructor(private systemInfo: SystemInfoRepository) {

    }

    execute(params: any[]) : unknown {
        const value: string = params[0];
        if (value.length > 0) {
            this.systemInfo.setHasUserSearched(true);
            this.systemInfo.setProductTitleSearched(value);
        } else {
            this.systemInfo.setHasUserSearched(false);
            this.systemInfo.setProductTitleSearched('');
        }
        return null;
    }

}
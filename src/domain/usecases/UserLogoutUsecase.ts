import type { Usecase } from './types';

export class UserLogoutUsecase implements Usecase {

    execute() {
        store.commit('isUserLoggedIn', false);
        store.commit('isUserSignedUp', false);
        store.commit('removeProductsFromFavourite');
      
        // redirect to homepage
        router.push({ name: 'index' });
    }

}
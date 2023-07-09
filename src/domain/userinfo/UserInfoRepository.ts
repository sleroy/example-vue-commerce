import { useCommerceStore } from '@/stores/commerce.ts'

export class UserInfoRepository {
    private _store: ReturnType<typeof useCommerceStore>;

    constructor() {
        this._store = useCommerceStore();
    }

    get store() {
        return this._store;
    }

    getProductTitleSearched() {
        return this._store.productTitleSearched
    }

    hasSearched() {
        return this._store.hasSearched;
    }

    isUserLoggedIn() {
        return this._store.userInfo.isLoggedIn;
    }
    isUserSignedUp() {
        return this._store.userInfo.isSignedUp;
    }
    getUserName() {
        return this._store.userInfo.name;
    }

    getUserNameOrDefault() {
        let name = this.getUserName();
        if (name === '') {
            return 'user';
        } else {
            return name;
        }
    }
    

    setUserLoggedIn(isUserLoggedIn: boolean) {
        this._store.userInfo.isLoggedIn = isUserLoggedIn;
    }
    setUserSignedUp(isSignedUp: boolean) {
        this._store.userInfo.isSignedUp = isSignedUp;
    }
    setHasUserSearched(hasSearched: boolean) {
        this._store.userInfo.hasSearched = hasSearched;
    }
    setUserName(name: string) {
        this._store.userInfo.name = name;
    }
    setProductTitleSearched(titleSearched: string) {
        this._store.userInfo.productTitleSearched = titleSearched;
    }
}
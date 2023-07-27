import type { RemoteNotificationConnector } from '@/connectors/RemoteNotificationConnector';
import { useCommerceStore } from '@/stores/commerce'

export class SystemInfoRepository {    
    
    constructor(private remoteNotificationConnector: RemoteNotificationConnector) {
    }

    get store() {
        return useCommerceStore();
    }

    get features() : string[] {
        return this.store.features
    }

    hasSearched(): boolean {
        return this.store.systemInfo.hasSearched
    }


    getProductTitleSearched(): string {
        return this.store.systemInfo.productTitleSearched
    }

    setProductTitleSearched(titleSearched: string) {
        this.store.systemInfo.productTitleSearched = titleSearched
    }

    setHasUserSearched(hasSearched: boolean) {
        this.store.systemInfo.hasSearched = hasSearched
    }


    requireCheckout(): boolean {
        console.log("Checkout required", this.store.systemInfo.checkoutRequired)
        return this.store.systemInfo.checkoutRequired;
    }

    setCheckoutRequired(option: boolean) {
        this.store.systemInfo.checkoutRequired = option;
    }

    isOpenedSigninUserPasswordModal() {
        return this.store.systemInfo.openSigninUserPasswordModal;
    }

    isOpenedSigninModal() {
        return this.store.systemInfo.openSigninModal;
    }

    isOpenedSignupModal() {
        return this.store.systemInfo.openSignupModal;
    }

    isOpenedCheckoutModal() {
        return this.store.systemInfo.openCheckoutModal;
    }

    showSigninUserPasswordModal(show: boolean) {
        this.store.systemInfo.openSigninUserPasswordModal = show;
    }


    showSigninModal(show: boolean) {
        this.store.systemInfo.openSigninModal = show;
    }

    showSignupModal(show: boolean) {
        this.store.systemInfo.openSignupModal = show;
    }

    showCheckoutModal(show: boolean) {
        this.store.systemInfo.openCheckoutModal = show;
    }

    enableNotifications() {
        this.remoteNotificationConnector.enableNotifications()
    }

}
import { useCommerceStore } from '@/stores/commerce'
import { obtainCheckout } from '../../adapters/AdapterStrategy'
import { Events, eventbus, registerEventHandler } from '../eventBus'
import { type Emitter, type EventType } from 'mitt'
import { type CheckoutServiceConnector } from '../../connectors/CheckoutServiceConnector'

let checkoutRegistration = false;

export class CheckoutRepository {
    private _store: ReturnType<typeof useCommerceStore>
    eventBus: Emitter<Record<EventType, unknown>>
    checkoutDB: CheckoutServiceConnector

    constructor() {
        this._store = useCommerceStore()
        this.checkoutDB = obtainCheckout(this._store.features)
        this.eventBus = eventbus

        if (!checkoutRegistration) {
            // We listen to userSignin event
            registerEventHandler(Events.userSignin, (e) => {
                console.log("Subscribe to checkout events", e)
                this.checkoutDB.subscribe((checkoutEvent) => {
                    console.log("Received checkout event", checkoutEvent)
                    eventbus.emit(Events.checkoutPerformed, checkoutEvent)
                })
            })
            checkoutRegistration = true;
        }
    }
}

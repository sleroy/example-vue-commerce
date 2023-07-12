import type { Product } from '../../domain/products/Product'
import { firestore } from './firebaseConfig'
import { collection, addDoc, query, getDocs, QueryDocumentSnapshot, type SnapshotOptions } from 'firebase/firestore'
import { hasFeature, setFeature } from './firebaseFeatures'
import type { CheckoutRequest, CheckoutResponse, CheckoutServiceConnector } from "../../connectors/CheckoutServiceConnector";
import { Events, eventbus } from '../../domain/eventBus';

export class FirebaseCheckoutAdapter implements CheckoutServiceConnector {
    async checkout(request: CheckoutRequest): Promise<CheckoutResponse> {
        try {
            await addDoc(collection(firestore, 'checkout'), request)
            // eventbus.emit(Events.checkoutPerformed, request)
            console.log("Received checkout with cart ", { cart: request })
            return Promise.resolve({
                success: true
            })
          } catch (e) {
            console.error('Error adding document: ', e)
            return Promise.reject(e)
          }
          

      
    }
}
import { firemessaging, firestore, requestPermissionMsg } from './firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import type { CheckoutRequest, CheckoutResponse, CheckoutServiceConnector } from "../../connectors/CheckoutServiceConnector";
import { onMessage } from 'firebase/messaging';



export class FirebaseCheckoutAdapter implements CheckoutServiceConnector {

  constructor() {
  }


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
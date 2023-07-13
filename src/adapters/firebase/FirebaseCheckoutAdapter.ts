import { firestore } from './firebaseConfig'
import { collection, addDoc, query, onSnapshot } from 'firebase/firestore'
import type {
  CheckoutRequest,
  CheckoutResponse,
  CheckoutServiceConnector
} from '../../connectors/CheckoutServiceConnector'
import { Events, eventbus } from '../../domain/eventBus'
import { getAuth } from 'firebase/auth'



export class FirebaseCheckoutAdapter implements CheckoutServiceConnector {
  constructor() {

  }
  subscribe(cb: (event: any) => unknown) {
    console.log("[Firebase] Register for checkout notifications")
    const currentUser = getAuth().currentUser
    if (!currentUser) {
      throw new Error("[Firebase] Cannot subscribe if the user is not authenticated")
    }
    // Subscribe to events
    const q = query(collection(firestore, 'checkout'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type == "added") {//first time it will be triggered
          cb(change.doc.data())
        }
      })
    })
  }

  async checkout(request: CheckoutRequest): Promise<CheckoutResponse> {
    try {

      await addDoc(collection(firestore, 'checkout'), request)
      // eventbus.emit(Events.checkoutPerformed, request)
      console.log('[Firebase] inserted checkout with cart ', { cart: request })
      return Promise.resolve({
        success: true
      })
    } catch (e) {
      console.error('[Firebase] Error adding document: ', e)
      return Promise.reject(e)
    }
  }
}

import type { ProductDatabaseConnector, ProductLoadResponse } from '../ProductDatabaseConnector'
import { fireapp } from './firebaseConfig';

export class FirebaseProductDatabaseAdapter implements ProductDatabaseConnector {
  async loadProducts(): Promise<ProductLoadResponse> {
    
    return Promise.resolve({
      products: []
    })
  }
}

import { DemoProductDatabaseAdapter } from './memory/DemoProductDatabaseAdapter';
import type { ProductDatabaseConnector } from '../connectors/ProductDatabaseConnector';
import { FirebaseProductDatabaseAdapter } from './firebase/FirebaseProductDatabaseAdapter';
const productConnectorMap = {
    'memory': () => new DemoProductDatabaseAdapter(),
    'firebase': () => new FirebaseProductDatabaseAdapter()
}


export function productConnector(storageType: string) : ProductDatabaseConnector {
    return productConnectorMap['memory']()
}
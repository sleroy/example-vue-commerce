import { DemoProductDatabaseAdapter } from './memory/DemoProductDatabaseAdapter'
import type { ProductDatabaseConnector } from '../connectors/ProductDatabaseConnector'
import { FirebaseProductDatabaseAdapter } from './firebase/FirebaseProductDatabaseAdapter'

const productConnectorMap: Record<string, () => ProductDatabaseConnector> = {
  memory: () => new DemoProductDatabaseAdapter(),
  firebase: () => new FirebaseProductDatabaseAdapter()
}

export function productConnector(features: string[]): ProductDatabaseConnector {
  const connectorFactory = features.map((f) => productConnectorMap[f]).find((c) => c != null)
  if (!connectorFactory) {
    throw new Error('No implementation found for the product database connector')
  }
  return connectorFactory()
}

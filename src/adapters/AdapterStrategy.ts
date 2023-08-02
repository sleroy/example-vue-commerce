// Connectors

// Implementations

/**
const productConnectorMap: Record<string, () => ProductDatabaseConnector> = {
  memory: () => new DemoProductDatabaseAdapter(),
  firebase: () => new FirebaseProductDatabaseAdapter(),
  amplify: () => new FirebaseProductDatabaseAdapter()
}
 */

/**
export function obtainProductDB(features: string[]): ProductDatabaseConnector {
  const connectorFactory = features.map((f) => productConnectorMap[f]).find((c) => c != null)
  if (!connectorFactory) {
    throw new Error('No implementation found for the product database connector')
  }
  return connectorFactory()
}
 */

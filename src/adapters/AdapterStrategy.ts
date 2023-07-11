import { DemoProductDatabaseAdapter } from './memory/DemoProductDatabaseAdapter'
import type { ProductDatabaseConnector } from '../connectors/ProductDatabaseConnector'
import { FirebaseProductDatabaseAdapter } from './firebase/FirebaseProductDatabaseAdapter'
import type { AuthenticationConnector } from '../connectors/AuthenticationConnector';
import { DemoAuthenticationAdapter } from './memory/DemoAuthenticationAdapter';
import { FirebaseAuthenticationAdapter } from './firebase/FirebaseAuthenticationAdapter';

const productConnectorMap: Record<string, () => ProductDatabaseConnector> = {
  memory: () => new DemoProductDatabaseAdapter(),
  firebase: () => new FirebaseProductDatabaseAdapter()
}

const authConnectorMap: Record<string, () => AuthenticationConnector> = {
  memory: () => new DemoAuthenticationAdapter(),
  firebase: () => new FirebaseAuthenticationAdapter()
}


export function obtainProductDB(features: string[]): ProductDatabaseConnector {
  const connectorFactory = features.map((f) => productConnectorMap[f]).find((c) => c != null)
  if (!connectorFactory) {
    throw new Error('No implementation found for the product database connector')
  }
  return connectorFactory()
}

export function obtainAuthentication(features: string[]): AuthenticationConnector {
  const connectorFactory = features.map((f) => authConnectorMap[f]).find((c) => c != null)
  if (!connectorFactory) {
    throw new Error('No implementation found for the product database connector')
  }
  return connectorFactory()
}

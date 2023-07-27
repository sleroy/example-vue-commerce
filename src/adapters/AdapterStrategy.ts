// Connectors
import type { ProductDatabaseConnector } from '../connectors/ProductDatabaseConnector'
import type { CheckoutServiceConnector } from '../connectors/CheckoutServiceConnector';
import type { AuthenticationConnector } from '../connectors/AuthenticationConnector';
import type { RemoteNotificationConnector } from '../connectors/RemoteNotificationConnector';

// Implementations
import { DemoProductDatabaseAdapter } from './memory/DemoProductDatabaseAdapter'
import { FirebaseProductDatabaseAdapter } from './firebase/FirebaseProductDatabaseAdapter'
import { DemoAuthenticationAdapter } from './memory/DemoAuthenticationAdapter';
import { DemoCheckoutConnectorAdapter } from './memory/DemoCheckoutAdapter';
import { FirebaseCheckoutAdapter } from './firebase/FirebaseCheckoutAdapter';
import { FirebaseAuthenticationAdapter } from './firebase/FirebaseAuthenticationAdapter';
import { FirebaseRemoteNotificationConnector } from './firebase/FirebaseRemoteNotificationConnector';
import { DemoRemoteNotificationConnector } from './memory/DemoRemoteNotificationConnector';
import { AmplifyAuthenticationAdapter } from './amplify/AmplifyAuthenticationAdapter';

const productConnectorMap: Record<string, () => ProductDatabaseConnector> = {
  memory: () => new DemoProductDatabaseAdapter(),
  firebase: () => new FirebaseProductDatabaseAdapter(),
  amplify: () => new FirebaseProductDatabaseAdapter()
}

const authConnectorMap: Record<string, () => AuthenticationConnector> = {
  memory: () => new DemoAuthenticationAdapter(),
  firebase: () => new FirebaseAuthenticationAdapter(),
  amplify: () => new AmplifyAuthenticationAdapter(),
}

const checkoutConnectorMap: Record<string, () => CheckoutServiceConnector> = {
  memory: () => new DemoCheckoutConnectorAdapter(),
  //firebase: () => new DemoCheckoutConnectorAdapter(),
  firebase: () => new FirebaseCheckoutAdapter(),
  amplify: () => new FirebaseCheckoutAdapter()
}

const notificationConnectorMap: Record<string, () => RemoteNotificationConnector> = {
  memory: () => new DemoRemoteNotificationConnector(),
  //firebase: () => new DemoCheckoutConnectorAdapter(),
  firebase: () => new FirebaseRemoteNotificationConnector(),
  amplify: () => new FirebaseRemoteNotificationConnector()
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

export function obtainCheckout(features: string[]): CheckoutServiceConnector {
  const connectorFactory = features.map((f) => checkoutConnectorMap[f]).find((c) => c != null)
  if (!connectorFactory) {
    throw new Error('No implementation found for the product database connector')
  }
  return connectorFactory()
}


export function obtainRemoteNotifications(features: string[]): RemoteNotificationConnector {
  const connectorFactory = features.map((f) => notificationConnectorMap[f]).find((c) => c != null)
  if (!connectorFactory) {
    throw new Error('No implementation found for the product database connector')
  }
  return connectorFactory()
}

import { getToken, onMessage } from "firebase/messaging";
import  type { RemoteNotificationConnector } from "../../connectors/RemoteNotificationConnector";
import { firemessaging, messagingToken } from './firebaseConfig';


export class FirebaseRemoteNotificationConnector implements RemoteNotificationConnector {

    token: string = "";

    enableNotifications(): void {
        this.obtainFirebaseMsgTokens()
        .then(token => this.token = token)
        .then(_ => this.subscribeTopic())

        this.registerServiceWorker();
    }


    private subscribeTopic(): Promise<boolean> {
        console.log("Subscribe to messages")
        onMessage(firemessaging, function (payload) {
            console.log('onMessage', payload);

        })


        return Promise.resolve(true)
    }

    private obtainFirebaseMsgTokens(): Promise<string> {
        getToken(firemessaging, { vapidKey: messagingToken }).then((currentToken) => {
            if (currentToken) {
                // Send the token to your server and update the UI if necessary
                // ...
                return Promise.resolve(currentToken)
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
                // ...
                return Promise.reject('No registration token available. Request permission to generate one.')
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            return Promise.reject(err)
        });
        return Promise.reject("Undefined behavior")
    }

    private registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('firebase-messaging-sw.js')
                .then(reg => {
                    console.log(`Service Worker Registration (Scope: ${reg.scope})`);
                    getToken(firemessaging, { vapidKey: messagingToken });
                })
                .catch(error => {
                    const msg = `Service Worker Error (${error})`;
                    console.error(msg);
                });
        } else {
            // happens when the app isn't served over HTTPS or if the browser doesn't support service workers
            console.warn('Service Worker not available');
        }
    }

    enableSubscriptions(registrationTokens: string) {
    
    }


}
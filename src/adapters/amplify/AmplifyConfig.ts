import { Amplify, Auth, Hub } from 'aws-amplify';
import { amplifyCredentials } from './amplifyCredentials';
import { Events, eventbus } from '@/domain/eventBus';



Amplify.configure(amplifyCredentials)

const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
    switch (event) {
        case "signIn":
            eventbus.emit(Events.userSignin, data)
            break;
        case "signOut":
            eventbus.emit(Events.userSignout, null)
            break;
        case "customOAuthState":
            eventbus.emit(Events.customOAuthState, data)
    }
});


export const amplify = {
    require: function() { }
}


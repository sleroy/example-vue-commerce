import type { RemoteNotificationConnector } from "../../connectors/RemoteNotificationConnector";

export class DemoRemoteNotificationConnector implements RemoteNotificationConnector {
    enableNotifications(): void {
        console.log("Enable notifications {TEST}")
    }

}
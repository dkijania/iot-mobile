import { Permissions, Notifications } from 'expo';
import { env } from "../configuration/Config";

const GRANTED = "granted";

export async function registerForPushNotificationsAsync(usernameValue) {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== GRANTED) {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== GRANTED) {
        return;
    }

    // Get the token that uniquely identifies this device
    let tokenValue = await Notifications.getExpoPushTokenAsync();

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return fetch(env.gatewayHost + '/chariot/gateway/webapp/notification/register-token', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: tokenValue,
            username: usernameValue
        }),
    });
}
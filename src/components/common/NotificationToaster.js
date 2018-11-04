import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import { registerForPushNotificationsAsync } from '../../utils/notifications';
import { Notifications } from 'expo';

export class NotificationToaster extends Component {
    state = {
        notification: {},
        isNotificationSend: false
    };

    componentDidMount() {
        registerForPushNotificationsAsync();
        Notifications.addListener(this.handleNotification);
    }

    getToasterContent(notification) {
        return <View><Text>{notification.data["key"]}</Text></View>;
    }

    handleNotification = (notification) => {
        content = this.getToasterContent(notification);
        this.setState({
            notification: notification,
            isNotificationSend: true
        });
        this.refs.toast.show(content);

    };
    render() {
        if (this.state.isNotificationSend)
            return (<View>
                <Toast
                    ref="toast"
                    style={{ backgroundColor: 'white' }}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: 'black' }}
                />
            </View>);
        return <View></View>;
    }
}
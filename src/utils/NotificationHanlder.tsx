import {
  AppState,
  DeviceEventEmitter,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  AndroidVisibility,
} from '@notifee/react-native';
import {getFCMToken} from './FCM';

export const requestUserPermission = async () => {
  if (Platform.OS === 'android') {
    const requestUserPermission = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status', authStatus);
      const token = getFCMToken();
      console.log('token', token);
    }
  } else {
    messaging().requestPermission();
  }
};

export const displayNotification = async (remoteMessage: any) => {
  console.log(remoteMessage,"remote message");
  const channel = await notifee?.createChannel({
    id: 'default_channel_id',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  await notifee?.displayNotification({
    title: remoteMessage.notification.title || 'Default Title',
    body: remoteMessage.notification.body || 'Default Body',
    data: remoteMessage?.data,
    android: {
      channelId: channel,
      smallIcon: 'ic-launcher',
      groupId: 'one_to-ten',
      visibility: AndroidVisibility.PUBLIC,
      style: remoteMessage.notification.android?.imageUrl && {
        type: AndroidStyle.BIGPICTURE,
        picture: remoteMessage.notification.android?.imageUrl,
      },
    },
  });
};

export const notificationListener = async () => {
  if (Platform.OS === 'ios') {
    messaging().onMessage(remoteMessage => {
      if (AppState.currentState.match(/inactive|background/)) {
        displayNotification(remoteMessage);
      }
    });
  } else {
    messaging().onMessage(remoteMessage => {
      if (AppState.currentState.match(/active/)) {
        displayNotification(remoteMessage);
      }
    });
  }
};

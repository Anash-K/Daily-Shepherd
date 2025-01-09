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

export const requestUserPermission = async () => {
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  } else {
    messaging().requestPermission();
  }
};

export const getToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  return token;
};

export const displayNotification = async (remoteMessage: any) => {
  const channel = await notifee?.createChannel({
    id: 'default_channel_id',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  await notifee?.displayNotification({
    title: `${remoteMessage.notification.title}`,
    body: `${remoteMessage.notification.body}`,
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

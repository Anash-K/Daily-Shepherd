import React, {useCallback, useEffect} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {QueryClient, QueryClientProvider, onlineManager} from 'react-query';
import NetInfo, {NetInfoSubscription} from '@react-native-community/netinfo';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Loader as LoaderType} from './src/types/CommonTypes';
import RootScreen from './src/navigation/RootScreen';
import Loader from './src/utils/Loader';
import messaging from '@react-native-firebase/messaging';
import {notificationListener} from './src/utils/NotificationHanlder';

const queryClient = new QueryClient();

const clientId =
  Platform.OS === 'android'
    ? '77025911882-38knj3gobjf8490723d3p0jirbrabqvn.apps.googleusercontent.com'
    : '77025911882-k148hcmib8lghourrdqmglospi5if67a.apps.googleusercontent.com';

GoogleSignin.configure({
  webClientId: clientId, // Dynamically set clientId based on platform
  offlineAccess: false,
});

// console.error = () => {};

export const AppLoaderRef = React.createRef<LoaderType>();

function App(): React.JSX.Element {
  const getInitNotification = useCallback(async () => {
    try {
      const remoteMessage = await messaging().getInitialNotification();
      if (remoteMessage) {
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    messaging()?.onNotificationOpenedApp(async (remoteMessage: any) => {
      console.log('Notification opened', remoteMessage);
      // onNotificationClick(remoteMessage?.data);
    });

    const unsubscribe = onlineManager?.setEventListener(setOnline => {
      return NetInfo?.addEventListener(state => {
        setOnline(!!state?.isInternetReachable);
      });
    });

    getInitNotification();
    notificationListener();

    return () => {
      unsubscribe;
      notificationListener();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      BootSplash.hide({fade: true});
    }, 2000);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <QueryClientProvider client={queryClient}>
          <RootScreen />
          <Loader ref={AppLoaderRef} />
        </QueryClientProvider>
      </View>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {backgroundColor: 'rgba(24, 23, 28, 1)', flex: 1},
});

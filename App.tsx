import React, {useEffect} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import BootSplash from 'react-native-bootsplash';
import {QueryClient, QueryClientProvider, onlineManager} from 'react-query';
import NetInfo, {NetInfoSubscription} from '@react-native-community/netinfo';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Loader as LoaderType} from './src/types/CommonTypes';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import RootScreen from './src/navigation/RootScreen';
import Loader from './src/utils/Loader';

const queryClient = new QueryClient();

const clientId =
  Platform.OS === 'android'
    ? '77025911882-38knj3gobjf8490723d3p0jirbrabqvn.apps.googleusercontent.com'
    : '77025911882-k148hcmib8lghourrdqmglospi5if67a.apps.googleusercontent.com';

GoogleSignin.configure({
  webClientId: clientId, // Dynamically set clientId based on platform
  offlineAccess: false,
});

console.error = () => {};

export const AppLoaderRef = React.createRef<LoaderType>();

function App(): React.JSX.Element {
  const isAuthenticated = useSelector((state: any) => !!state?.auth?.token);

  useEffect(() => {
    // Manage online status with NetInfo and react-query's onlineManager
    const unsubscribe = onlineManager.setEventListener(setOnline => {
      const netInfoUnsubscribe = NetInfo.addEventListener(state => {
        setOnline(state?.isInternetReachable ?? false);
      });

      // Return the cleanup function for NetInfo
      return netInfoUnsubscribe;
    });

    // Cleanup for onlineManager event listener
    return () => {
      unsubscribe;
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      BootSplash.hide({fade: true});
    }, 3000);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <AlertNotificationRoot
          theme="dark"
          colors={[
            {
              overlay: '#121212', // Overlay background color (light theme)
              success: '#20C997', // Success icon and primary color
              danger: '#FF6347', // Danger/Error color
              warning: '#FFA500', // Warning color
              info: '#1E90FF', // Info color
              card: '#222222', // Card background color
              label: '#FFFFFF', // Label text color
            },
            {
              overlay: '#121212', // Overlay background color (dark theme)
              success: '#20C997', // Success icon and primary color
              danger: '#FF6347', // Danger/Error color
              warning: '#FFA500', // Warning color
              info: '#1E90FF', // Info color
              card: '#333333', // Card background color
              label: '#FFFFFF', // Label text color
            },
          ]}>
          <QueryClientProvider client={queryClient}>
            <StatusBar
              barStyle="light-content"
              backgroundColor="rgba(24, 23, 28, 1)"
            />
            <RootScreen />
            <Loader ref={AppLoaderRef} />
          </QueryClientProvider>
        </AlertNotificationRoot>
      </View>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {backgroundColor: 'rgba(24, 23, 28, 1)', flex: 1},
});

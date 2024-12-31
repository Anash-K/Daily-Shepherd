import React, {useEffect, useRef} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import BootSplash from 'react-native-bootsplash';
import AuthStack from './src/navigation/AuthStack';
import MainStack from './src/navigation/MainStack';
import {QueryClient, QueryClientProvider, onlineManager} from 'react-query';
import {OnlineManager} from 'react-query/types/core/onlineManager';
import NetInfo, {NetInfoSubscription} from '@react-native-community/netinfo';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Loader} from './src/types/CommonTypes';
import {AlertNotificationRoot} from 'react-native-alert-notification';

const Stack = createStackNavigator();

const queryClient = new QueryClient();

GoogleSignin.configure({
  webClientId:
    '77025911882-38knj3gobjf8490723d3p0jirbrabqvn.apps.googleusercontent.com',
  offlineAccess: true,
  scopes: ['https://www.googleapis.com/auth/drive'],
  forceCodeForRefreshToken: true,
});

// console.error = () => {};

export const AppLoaderRef = React.createRef<Loader>();

function App(): React.JSX.Element {
  const isAuthenticated = useSelector(state => !!state?.auth?.token);

  console.log(isAuthenticated, 'App tokenm');

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
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {isAuthenticated ? (
                <Stack.Screen name="MainStack" component={MainStack} />
              ) : (
                <Stack.Screen name="AuthStack" component={AuthStack} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </AlertNotificationRoot>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {backgroundColor: 'rgba(24, 23, 28, 1)', flex: 1},
});

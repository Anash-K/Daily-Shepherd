import React, {useEffect} from 'react';
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

const Stack = createStackNavigator();

const queryClient = new QueryClient();

// console.error = () => {};

function App(): React.JSX.Element {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );

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
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {backgroundColor: 'rgba(24, 23, 28, 1)', flex: 1},
});

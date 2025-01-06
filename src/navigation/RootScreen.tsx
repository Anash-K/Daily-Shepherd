import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';
import AlertNotificationWrapper from '../common/AlterNotificationWrapper';
import {DeviceEventEmitter, StatusBar} from 'react-native';


const Stack = createStackNavigator();

const RootScreen = () => {
  const isAuthenticated = useSelector((state: any) => !!state?.auth?.token);
  return (
    <AlertNotificationWrapper>
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
    </AlertNotificationWrapper>
  );
};

export default RootScreen;

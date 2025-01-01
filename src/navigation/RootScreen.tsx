import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const RootScreen = () => {
  const isAuthenticated = useSelector((state: any) => !!state?.auth?.token);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <Stack.Screen name="MainStack" component={MainStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootScreen;

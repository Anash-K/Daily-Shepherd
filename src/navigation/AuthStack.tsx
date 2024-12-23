import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/Login';
import CreateAccount from '../screens/CreateAccount';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import ProfilePicture from '../screens/ProfilePicture';
import CustomButton from '../common/CustomButton';
import {Platform, StyleSheet} from 'react-native';
import NotificationPreferences from '../screens/NotificationPreferences';
import CustomImages from '../assets/customImages';
import ForgotPassword from '../screens/ForgotPassword';
import CustomFont from '../assets/customFonts';
import DailyInsPiration from '../screens/DailyInspiration';
import InspiringPodcast from '../screens/InspiringPodcast';
import CustomHeader from '../common/CustomHeader';
import {createStackNavigator} from '@react-navigation/stack';

type AuthScreenParams = {
  Login: undefined;
  CreateAccount: undefined;
  ProfilePicture: undefined;
  NotificationPreferences: undefined;
  ForgotPassword: undefined;
  DailyInsPiration: undefined;
  InspiringPodcast: undefined;
};

export type AuthStackProps<T extends keyof AuthScreenParams> = {
  navigation: NavigationProp<AuthScreenParams, T>;
  route: RouteProp<AuthScreenParams, T>;
};

const Stack = createStackNavigator<AuthScreenParams>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerLook,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: 'center',
        cardStyle: {backgroundColor: 'rgba(24, 23, 28, 1)'},
      }}>
      <Stack.Screen
        name="DailyInsPiration"
        component={DailyInsPiration}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InspiringPodcast"
        component={InspiringPodcast}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfilePicture"
        component={ProfilePicture}
        options={({navigation}) => ({
          headerTitle: 'Profile setup',
          headerLeft: () => (
            <CustomButton
              onPress={() => navigation.goBack()}
              icon={CustomImages.backIcon}
              iconStyle={styles.backButtonIcon}
              buttonStyle={styles.backButton}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NotificationPreferences"
        component={NotificationPreferences}
        options={({navigation}) => ({
          headerShown: true,
          title: 'Notifications preference',
          headerLeft: () => '',
        })}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={({navigation}) => ({
          headerLeft: () => (
            <CustomButton
              onPress={() => navigation.goBack()}
              icon={CustomImages.backIcon}
              iconStyle={styles.backButtonIcon}
              buttonStyle={styles.backButton}
            />
          ),
          headerTitle: () => null,
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({
  backButtonIcon: {
    padding: 0,
    width: 15,
    height: 25,
    marginLeft: Platform.select({ios: 7, android: 10}),
  },
  headerLook: {
    backgroundColor: 'rgba(24, 23, 28, 1)',
    borderBottomColor: '#26252A',
    borderBottomWidth: 1,
    height: Platform.select({ios: 100}),
  },
  backButton: {
    backgroundColor: 'rgba(24, 23, 28, 1)',
    padding: 16,
    margin: 0,
    marginBottom: Platform.select({ios: 10}),
  },
  skipButtonText: {
    color: 'rgba(147, 150, 157, 1)',
  },
  headerTitle: {
    color: 'rgba(250, 250, 250, 1)',
    fontFamily: CustomFont.Urbanist600,
    fontSize: 24,
    lineHeight: 28.8,
    marginBottom: Platform.select({ios: 10}),
  },
});

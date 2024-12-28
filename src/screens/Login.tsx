import React, {useCallback, useEffect, useRef} from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'; // 11.5.0
import CustomImages from '../assets/customImages';
import CustomButton from '../common/CustomButton';
import CustomFont from '../assets/customFonts';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AuthStackProps} from '../navigation/AuthStack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginApi} from '../axious/PostApis';
import {getFCMToken} from '../utils/FCM';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationToast,
  AlertNotificationDialog,
  Toast,
} from 'react-native-alert-notification';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import Loader from '../utils/Loader';
import {AppLoaderRef} from '../../App';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {loginSuccess} from '../store/reducers/AuthReducer';
import {ErrorHandler} from '../utils/ErrorHandler';

const Login: React.FC<AuthStackProps<'Login'>> = ({navigation}) => {
  const {top, bottom} = useSafeAreaInsets();

  const buttonRef = useRef<boolean>(false);
  const dispatch = useDispatch();

  const {token, email, isAuthenticated} = useSelector(
    (state: any) => state.auth,
  );

  console.log(token, email, isAuthenticated);

  const handlePress = () => {};
  const handleNav = () => {
    navigation.navigate('CreateAccount'); // This will work as expected now
  };
  const handleLogin = () => {
    navigation.navigate('ProfilePicture');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const onGoogleSignIn = useCallback(async () => {
    if (buttonRef.current) {
      return;
    }

    buttonRef.current = true;

    AppLoaderRef?.current?.start();

    try {
      // Sign out any existing session to start fresh
      await GoogleSignin.signOut();

      // Check if Google Play Services are available
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // Proceed to sign in
      const userInfo = await GoogleSignin.signIn();

      // Get tokens for authentication
      const {idToken, accessToken} = await GoogleSignin.getTokens();

      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(credential);

      const token = await auth()?.currentUser?.getIdToken();

      // Get FCM token
      const pushToken = await getFCMToken();

      const response = await LoginApi({
        firebase_token: token,
        device_type: Platform.OS,
        push_token: pushToken,
        email: userInfo?.data?.user?.email ?? '',
      });

      if (response?.status === 200) {
        const {data} = response;
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody:
            'Welcome! You have successfully Logged in. Let’s get started!',
        });
        dispatch(loginSuccess(data.payload, data.token));
      }
    } catch (error) {
      console.error('An error occurred during Google Sign-In:', error);
      ErrorHandler(error);
    } finally {
      buttonRef.current = false; // Reset the button state
      AppLoaderRef?.current?.stop();
    }
  }, []);

  const onAppleSignIn = useCallback(async () => {
    if (buttonRef.current) {
      console.warn('Button click blocked to prevent multiple sign-ins.');
      return;
    }

    buttonRef.current = true;

    AppLoaderRef?.current?.start();

    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState == appleAuth.State.AUTHORIZED) {
        const credential = auth.AppleAuthProvider.credential(
          appleAuthRequestResponse.identityToken,
          appleAuthRequestResponse.nonce,
        );

        await auth().signInWithCredential(credential);

        const token = await auth()?.currentUser?.getIdToken();

        if (
          appleAuthRequestResponse?.email &&
          appleAuthRequestResponse?.fullName?.givenName &&
          appleAuthRequestResponse?.fullName?.familyName
        ) {
          auth()?.currentUser?.updateProfile({
            displayName: `${appleAuthRequestResponse.fullName.givenName} ${appleAuthRequestResponse.fullName.familyName}`,
          });
          auth()?.currentUser?.updateEmail(appleAuthRequestResponse.email);
        }

        const pushToken = await getFCMToken();

        const response = await LoginApi({
          device_type: Platform.OS,
          firebase_token: token,
          push_token: pushToken,
          email: auth()?.currentUser?.email ?? '',
        });

        console.log(response, 'response');
      }
    } catch (error) {
      // throw error;
      console.log(error);
      ErrorHandler(error);
    } finally {
      buttonRef.current = false;
      AppLoaderRef?.current?.stop();
    }
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={[
        styles.container,
        {paddingBottom: Platform.select({ios: bottom, android: 20})},
      ]}>
      <Loader ref={AppLoaderRef} />

      <View style={{flex: 1}}>
        <ImageBackground
          source={CustomImages.loginTopBg}
          style={{height: 300, justifyContent: 'center'}}>
          <Image
            source={CustomImages.logo}
            resizeMode="contain"
            style={styles.logo}
          />
        </ImageBackground>

        <View style={{paddingHorizontal: 16}}>
          <Text style={styles.title}>
            Your Daily <Text style={{color: '#20C997'}}>Bible</Text> Companion
          </Text>
          <Text style={styles.subTitle}>
            Start your day with meaningful Bible verses and reflections. Sign in
            to explore.
          </Text>
          <CustomButton
            text="Sign In with Apple"
            onPress={onAppleSignIn}
            buttonStyle={styles.appleSign}
            icon={CustomImages.appleLogo}
            iconStyle={{width: 24, height: 24}}
          />
          <CustomButton
            text="Sign In with Google"
            onPress={onGoogleSignIn}
            buttonStyle={styles.googleSign}
            icon={CustomImages.googleLogo}
            iconStyle={{width: 24, height: 24}}
            textStyle={{color: '#FAFAFA'}}
          />
        </View>
      </View>

      <View style={[styles.bottomBox]}>
        <Text style={styles.bottomText}>
          By continuing to use CupidCoach application, you acknowledge and agree
          that you have accepted the{' '}
          <Text style={[styles.bottomText, styles.innerBottomText]}>
            Terms of Service
          </Text>{' '}
          and have reviewed the{' '}
          <Text style={[styles.bottomText, styles.innerBottomText]}>
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
      {/* Dark-Themed Toast */}
      <AlertNotificationToast isDark />
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  subTitle: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 19.2,
    textAlign: 'center',
    color: '#FAFAFA',
    marginTop: 20,
  },
  googleSign: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FAFAFA',
    columnGap: 11,
  },
  appleSign: {
    backgroundColor: '#FAFAFA',
    columnGap: 11,
    marginBottom: 16,
    marginTop: 48,
  },
  container: {
    backgroundColor: 'rgba(24, 23, 28, 1)',
    flex: 1,
  },
  title: {
    fontFamily: CustomFont.Urbanist700,
    lineHeight: 36,
    fontSize: 30,
    color: '#FAFAFA',
    textAlign: 'center',
    maxWidth: 239,
    marginHorizontal: 'auto',
  },
  logo: {
    width: 150,
    height: 191,
    alignSelf: 'center',
  },
  inputBox: {
    marginVertical: 0,
  },
  forgotText: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(250, 250, 250, 1)',
    textAlign: 'center',
    fontFamily: CustomFont.Urbanist400,
  },
  inputs: {
    marginVertical: 32,
    rowGap: 24,
  },
  bottomText: {
    fontSize: 12,
    lineHeight: 14.4,
    fontFamily: CustomFont.Urbanist400,
    textAlign: 'center',
    color: '#FAFAFA',
  },
  innerBottomText: {
    color: '#20C997',
    fontFamily: CustomFont.Urbanist600,
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 6,
    marginVertical: 15,
    paddingHorizontal: 16,
  },
});

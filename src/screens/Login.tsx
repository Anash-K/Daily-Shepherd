import React, {useCallback, useEffect, useRef} from 'react';
import {
  Image,
  ImageBackground,
  InteractionManager,
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
  AlertNotificationToast,
  Toast,
} from 'react-native-alert-notification';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import Loader from '../utils/Loader';
import {AppLoaderRef} from '../../App';
import {useDispatch, useSelector} from 'react-redux';
import {loginSuccess, updateIsOldUser} from '../store/reducers/AuthReducer';
import {ErrorHandler} from '../utils/ErrorHandler';
import {CustomToaster} from '../utils/AlertNotification';

const Login: React.FC<AuthStackProps<'Login'>> = ({navigation}) => {
  const {top, bottom} = useSafeAreaInsets();

  const buttonRef = useRef<boolean>(false);
  const dispatch = useDispatch();

  // const {token, email, isAuthenticated} = useSelector(
  //   (state: any) => state.auth,
  // );

  const handlePress = () => {};
  const handleNav = () => {
    navigation.navigate('CreateAccount'); // This will work as expected now
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const GoogleSignModalHandler = useCallback(() => {
    AppLoaderRef?.current?.start();
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        onGoogleSignIn();
      }, 500);
    });
  }, []);

  const onGoogleSignIn = useCallback(async () => {
    if (buttonRef.current) {
      return;
    }

    buttonRef.current = true;

    try {
      // Sign out any existing session to start fresh
      await GoogleSignin.signOut();

      // Check if Google Play Services are available

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Proceed to sign in
      const userInfo = await GoogleSignin.signIn();

      

      if (!userInfo) {
        throw new Error('User info is missing');
      }

      // Get tokens for authentication
      const {idToken, accessToken} = await GoogleSignin.getTokens();

      if (!idToken || !accessToken) {
        throw new Error('Failed to get tokens');
      }

      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );

      await auth().signInWithCredential(credential);

      const token = await auth()?.currentUser?.getIdToken();

      if (!token) {
        throw new Error('Failed to retrieve Firebase ID token');
      }

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

        CustomToaster({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          message:
            'Welcome! You have successfully Logged in. Let’s get started!',
        });
        if (data?.payload?.name) {
          dispatch(updateIsOldUser(true));
        } else {
          dispatch(updateIsOldUser(false));
        }
        setTimeout(() => {
          dispatch(loginSuccess(data.payload));
        }, 500);
      }
    } catch (error) {
      console.error('An error occurred during Google Sign-In:', error);
      ErrorHandler(error);
    } finally {
      buttonRef.current = false; // Reset the button state
      AppLoaderRef.current?.stop();
    }
  }, []);

  const onAppleSignIn = useCallback(async () => {
    if (buttonRef.current) {
      return;
    }

    if (Platform.OS !== 'ios') {
      return;
    }

    buttonRef.current = true;

    AppLoaderRef?.current?.start();

    try {
      // Perform the Apple Sign-In request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // Get credential state for the user
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        // Create a credential for Firebase authentication
        const credential = auth.AppleAuthProvider.credential(
          appleAuthRequestResponse.identityToken ?? '',
          appleAuthRequestResponse.nonce ?? '',
        );

        // Sign in with Firebase using the credential
        await auth().signInWithCredential(credential);

        // Fetch the Firebase ID token for authentication
        const token = await auth()?.currentUser?.getIdToken();

        // Get the user's email and display name (if provided)
        const email =
          appleAuthRequestResponse?.email || auth()?.currentUser?.email;
        const displayName =
          appleAuthRequestResponse?.fullName?.givenName &&
          appleAuthRequestResponse?.fullName?.familyName
            ? `${appleAuthRequestResponse.fullName.givenName} ${appleAuthRequestResponse.fullName.familyName}`
            : auth()?.currentUser?.displayName;

        // Update Firebase user profile (optional)
        if (appleAuthRequestResponse?.fullName?.givenName) {
          await auth()?.currentUser?.updateProfile({displayName});
        }

        // Get FCM token for push notifications
        const pushToken = await getFCMToken();

        // Make API call to your Login API
        const response = await LoginApi({
          firebase_token: token,
          device_type: Platform.OS,
          push_token: pushToken,
          email: email ?? '',
        });

        if (response?.status === 200) {
          const {data} = response;
        

          CustomToaster({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            message:
              'Welcome! You have successfully Logged in. Let’s get started!',
          });

          if (data?.payload?.name) {
            dispatch(updateIsOldUser(true));
          } else {
            dispatch(updateIsOldUser(false));
          };

          setTimeout(() => {
            dispatch(loginSuccess(data.payload));
          }, 500);
        } else {
          console.log('error in api');
        }
      } else {
        console.warn('Apple Sign-In not authorized');
      }
    } catch (error) {
      console.error('An error occurred during Apple Sign-In:', error);
      ErrorHandler(error);
    } finally {
      buttonRef.current = false; // Reset the button state
      AppLoaderRef?.current?.stop();
    }
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={[
        styles.container,
        {paddingBottom: Platform.select({ios: bottom, android: 20})},
      ]} showsVerticalScrollIndicator={false}>
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
          <View style={{marginTop: 48}}>
            {Platform.OS == 'ios' && (
              <CustomButton
                text="Sign In with Apple"
                onPress={onAppleSignIn}
                buttonStyle={styles.appleSign}
                icon={CustomImages.appleLogo}
                iconStyle={{width: 24, height: 24}}
              />
            )}

            <CustomButton
              text="Sign In with Google"
              onPress={GoogleSignModalHandler}
              buttonStyle={styles.googleSign}
              icon={CustomImages.googleLogo}
              iconStyle={{width: 24, height: 24}}
              textStyle={{color: '#FAFAFA'}}
            />
          </View>
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

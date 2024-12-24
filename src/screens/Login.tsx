import React, { useCallback, useEffect } from 'react';
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
import CustomInput from '../common/CustomInput';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AuthStackProps} from '../navigation/AuthStack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { LoginApi } from '../axious/PostApis';

const Login: React.FC<AuthStackProps<'Login'>> = ({navigation}) => {
  const {top, bottom} = useSafeAreaInsets();

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

  const CreateAccount = useCallback(async() =>{

    const response = await auth().createUserWithEmailAndPassword(
      'test@gmail.com',
      'password123',
    );

    const firebaseToken = await response.user.getIdToken();

    // const response = await LoginApi()
  },[]);

  


  useEffect(() =>{
    GoogleSignin.configure({
      webClientId: '77025911882-38knj3gobjf8490723d3p0jirbrabqvn.apps.googleusercontent.com',
    });
  },[]);

  return (
    <View
      style={[
        styles.container,
        {paddingBottom: Platform.select({ios: bottom, android: 20})},
      ]}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 20}>
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
              Start your day with meaningful Bible verses and reflections. Sign
              in to explore.
            </Text>
            <CustomButton
              text="Sign In with Apple"
              onPress={handleLogin}
              buttonStyle={styles.appleSign}
              icon={CustomImages.appleLogo}
              iconStyle={{width: 24, height: 24}}
            />
            <CustomButton
              text="Sign In with Google"
              onPress={handleLogin}
              buttonStyle={styles.googleSign}
              icon={CustomImages.googleLogo}
              iconStyle={{width: 24, height: 24}}
              textStyle={{color: '#FAFAFA'}}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

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
    </View>
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

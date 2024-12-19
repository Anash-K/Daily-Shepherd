import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomImages from '../assets/customImages';
import CustomButton from '../common/CustomButton';
import CustomFont from '../assets/customFonts';
import CustomInput from '../common/CustomInput';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AuthStackProps} from '../navigation/AuthStack';

const CreateAccount: React.FC<AuthStackProps<'CreateAccount'>> = ({
  navigation,
}) => {
  const {top, bottom} = useSafeAreaInsets();

  const handleNav = () => {
    navigation.navigate('Login');
  };

  const handleLogin = () => {
    navigation.navigate('ProfilePicture');
  };

  const handlePress = () => {};
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 20}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <Image
            source={CustomImages.logo}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.title}>Let’s get you in!</Text>
          <View style={styles.inputs}>
            <CustomInput
              onChange={handlePress}
              label="Name"
              inputBoxStyle={styles.inputBox}
            />
            <CustomInput
              onChange={handlePress}
              label="Email"
              inputBoxStyle={styles.inputBox}
            />
            <CustomInput
              onChange={handlePress}
              label="Password"
              inputBoxStyle={styles.inputBox}
              isPassword={true}
              //   iconStyle={}
            />
          </View>
          <CustomButton
            text="Create account"
            onPress={handleLogin}
            buttonStyle={{marginBottom: 24}}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottomBox}>
        <Text style={styles.bottomText}>Already have an account? </Text>
        <TouchableOpacity
          style={{alignItems: 'center', justifyContent: 'center'}}
          onPress={handleNav}>
          <Text style={[styles.bottomText, styles.innerBottomText]}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(24, 23, 28, 1)',
    flex: 1,
    padding: 16,
    paddingTop: 50,
  },
  title: {
    fontFamily: CustomFont.Urbanist600,
    lineHeight: 28.8,
    fontSize: 24,
    color: '#20C997',
    textAlign: 'center',
    marginTop: 33.5,
  },
  logo: {
    width: 125,
    height: 90,
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
    fontSize: 16,
    lineHeight: 19.2,
    fontFamily: CustomFont.Urbanist400,
    textAlign: 'center',
    color: 'rgba(147, 150, 157, 1)',
  },
  innerBottomText: {
    color: 'rgba(250, 250, 250, 1)',
    fontFamily: CustomFont.Urbanist600,
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 6,
    marginVertical: 15,
  },
});

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import CustomImages from '../assets/customImages';
import CustomButton from '../common/CustomButton';
import CustomFont from '../assets/customFonts';

const Login: React.FC = () => {
  const handlePress = () => {};
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={CustomImages.logo}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome back!</Text>
        <CustomButton text="Login" onPress={handlePress} />
        <Text>Forgot password?</Text>
      </View>

      <Text>Don’t have an account? Create Account</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(24, 23, 28, 1)',
    flex: 1,
  },
  title: {
    fontFamily: CustomFont.Urbanist600,
    lineHeight: 28.8,
    fontSize: 24,
    color: '#20C997',
    textAlign: 'center',
    marginTop:33.5
  },
  logo: {
    width: 125,
    height: 90,
    alignSelf:'center'
  },
});

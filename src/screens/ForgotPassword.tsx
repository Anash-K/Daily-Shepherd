import {StyleSheet, Text, View} from 'react-native';
import CustomInput from '../common/CustomInput';
import React, {useCallback} from 'react';
import CustomButton from '../common/CustomButton';
import CustomFont from '../assets/customFonts';
import {AuthStackProps} from '../navigation/AuthStack';

const ForgotPassword: React.FC<AuthStackProps<'ForgotPassword'>> = () => {
  const handleChange = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subTitle}>
        No worries! Just enter your email, and we’ll help you reset your
        password.
      </Text>
      <CustomInput
        placeholderText="christbell@gmail.com"
        onChange={handleChange}
        inputBoxStyle={{marginTop: 32, marginBottom: 24}}
      />
      <CustomButton text="Reset now" onPress={handleChange} />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontFamily: CustomFont.Urbanist700,
    fontSize: 24,
    lineHeight: 28.8,
    color: 'rgba(250, 250, 250, 1)',
    marginBottom: 8,
  },
  subTitle: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 19.2,
    color: 'rgba(250, 250, 250, 1)',
  },
});

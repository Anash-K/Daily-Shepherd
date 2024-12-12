import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
  ImageSourcePropType,
  TextStyle,
  ImageStyle,
  TextInputProps,
  Animated,
} from 'react-native';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';

interface CustomInputProps {
  value?: string;
  inputConfigurations?: TextInputProps;
  labelStyle?: TextStyle;
  inputBoxStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  label?: string;
  onChange: (text: string) => void;
  isPassword?: boolean;
  isPhoneInput?: boolean;
  placeholderText?: string;
  handleIconAction?: () => void;
  showIcon?: boolean;
  iconSource?: ImageSourcePropType;
  iconStyle?: ImageStyle;
  customPressableStyle?: ViewStyle;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  inputConfigurations,
  labelStyle,
  inputBoxStyle,
  inputStyle,
  label,
  onChange,
  isPassword,
  isPhoneInput,
  placeholderText,
  handleIconAction,
  showIcon,
  iconSource,
  iconStyle,
  customPressableStyle,
}) => {
  const [isSecure, setIsSecure] = useState(true);
  const animatedLabel = React.useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.timing(animatedLabel, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!value) {
      Animated.timing(animatedLabel, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelTop = animatedLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [18, -10], // Adjust label position
  });

  const labelFontSize = animatedLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 14], // Adjust label size
  });

  const toggleSecurity = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={[styles.container, inputBoxStyle]}>
      {label && (
        <Animated.Text
          style={[
            styles.label,
            labelStyle,
            {
              top: labelTop,
              fontSize: labelFontSize,
            },
          ]}>
          {label}
        </Animated.Text>
      )}
      <View style={styles.inputContainer}>
        {/* {isPhoneInput ? (
          <PhoneInput
            containerStyle={[styles.phoneInputContainer, inputStyle]}
            textContainerStyle={styles.phoneTextContainer}
            textInputStyle={styles.phoneTextInput}
            onChangeFormattedText={onChange}
            defaultCode="US"
            layout="second"
            textInputProps={{
              ...inputConfigurations,
            }}
          />
        ) : (
          
        )} */}
        <TextInput
          style={[styles.input, inputStyle]}
          onChangeText={onChange}
          {...inputConfigurations}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          secureTextEntry={isPassword && isSecure}
          placeholder={placeholderText}
          placeholderTextColor={'rgba(250, 250, 250, 0.5)'}
        />

        {isPassword && (
          <Pressable
            onPress={toggleSecurity}
            style={({pressed}) => [
              styles.pressableButton,
              pressed && styles.pressed,
            ]}>
            <Image
              source={
                isSecure ? CustomImages.closeEyeIcon : CustomImages.openEye
              }
              style={styles.iconEye}
              resizeMode="contain"
            />
          </Pressable>
        )}

        {showIcon && (
          <Pressable
            onPress={handleIconAction}
            style={({pressed}) => [
              styles.pressableButton,
              customPressableStyle,
              pressed && styles.pressed,
            ]}>
            <Image
              source={iconSource}
              style={[styles.iconEye, iconStyle]}
              resizeMode="contain"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(56, 57, 62, 1)',
    padding: 17,
    backgroundColor: '#18171C',
    borderRadius: 10,
    fontSize: 18,
    flex: 1,
    lineHeight: 21.6,
    fontFamily: CustomFont.Urbanist400,
    color: 'rgba(250, 250, 250, 1)',
    paddingLeft: 16,
  },
  label: {
    textTransform: 'capitalize',
    fontSize: 18,
    fontFamily: CustomFont.Urbanist400,
    lineHeight: 21.6,
    color: '#fff',
    position: 'absolute',
  },
  iconEye: {
    width: 24,
    height: 24,
  },
  pressableButton: {
    position: 'absolute',
    top: '50%',
    right: 12,
    transform: [{translateY: -12}],
  },
  pressed: {
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  phoneInputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D7D8DC',
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  phoneTextContainer: {
    backgroundColor: 'transparent',
    borderLeftWidth: 1,
    borderColor: '#D7D8DC',
    maxHeight: 60,
    padding: 0,
    color: 'rgba(250, 250, 250, 0.5)',
    fontSize: 18,
  },
  phoneTextInput: {
    fontSize: 16,
    color: '#000',
    padding: 0,
  },
});

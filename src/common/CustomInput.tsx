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
  Platform,
} from 'react-native';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';
import {FloatingLabelInput} from 'react-native-floating-label-input';

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
  customInputContentStyle?: ViewStyle;
  isDisabled?: boolean;
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
  customInputContentStyle,
  isDisabled = false,
}) => {
  const [isSecure, setIsSecure] = useState(true);
  const animatedLabel = React.useRef(new Animated.Value(0)).current;

  const toggleSecurity = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={[styles.container, inputBoxStyle]}>
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

        <FloatingLabelInput
          label={(<Text style={styles.labelText}>{label}</Text>) as any}
          isPassword={isPassword}
          labelStyles={styles.label}
          containerStyles={[
            styles.input,
            isDisabled && {
              borderColor: '#38393E',
            },
          ]}
          customLabelStyles={{
            fontSizeFocused: 14,
            colorFocused: 'rgba(250, 250, 250, 1)',
            fontSizeBlurred: 18,
            topFocused: -28,
          }}
          inputStyles={[styles.inputContent] as any}
          togglePassword={isSecure}
          onChangeText={onChange}
          customShowPasswordComponent={
            <Image
              source={CustomImages.closeEyeIcon}
              style={[styles.iconEye]}
              resizeMode="contain"
            />
          }
          customHidePasswordComponent={
            <Image
              source={CustomImages.openEye}
              style={[styles.iconEye, styles.openEyeStyle]}
              resizeMode="contain"
            />
          }
          {...inputConfigurations}
        />

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
  openEyeStyle: {
    width: 19,
    marginRight: 22,
  },
  outlineInput: {
    borderRadius: 10,
    borderColor: 'rgba(56, 57, 62, 1)',
    borderWidth: 1,
    fontFamily: CustomFont.Urbanist400,
  },
  container: {
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(56, 57, 62, 1)',
    backgroundColor: '#18171C',
    paddingLeft: 2,
    borderRadius: 12,
    paddingVertical: Platform.select({ios: 3, android: 2}),
    height: 56,
    marginBottom: 17,
  },
  inputContent: {
    fontSize: 18,
    lineHeight: 21.6,
    fontFamily: CustomFont.Urbanist400,
    color: 'rgba(250, 250, 250, 1)',
    backgroundColor: 'transparent',
    margin: Platform.select({ios: 3, android: 3}),
    marginVertical: Platform.select({ios: 3, android: 3}),
    // paddingVertical: Platform.select({ios: 5, android: 5}),
    paddingHorizontal: 16,
  },
  label: {
    backgroundColor: 'rgba(24, 23, 28, 1)',
    paddingHorizontal: 5,
    marginLeft: 10,
    textTransform: 'capitalize',
    fontSize: 18,
    fontFamily: CustomFont.Urbanist400,
    lineHeight: 16.8,
  },
  labelText: {
    color: 'rgba(250, 250, 250, 0.5)',
  },
  iconEye: {
    width: 24,
    height: 24,
    marginRight: 19,
  },
  passwordButton: {
    marginRight: 19,
  },
  pressableButton: {
    position: 'absolute',
    top: '50%',
    right: 12,
    transform: [{translateY: -19}],
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

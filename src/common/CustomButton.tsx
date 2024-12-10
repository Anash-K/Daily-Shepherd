import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from 'react-native';
import CustomFont from '../assets/customFonts';

interface CustomButtonProps {
  text: string;
  onPress: () => void;
  icon?: ImageSourcePropType; // For handling images (local or remote)
  iconPosition?: 'left' | 'right'; // Icon position
  buttonStyle?: ViewStyle; // Custom button style
  textStyle?: TextStyle; // Custom text style
  iconStyle?: ViewStyle | ''; // Custom icon style
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  icon,
  iconPosition = 'left',
  buttonStyle,
  textStyle,
  iconStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      {icon && iconPosition === 'left' && (
        <Image source={icon} style={[styles.icon, iconStyle]} />
      )}
      <Text style={[styles.text, textStyle]}>{text}</Text>
      {icon && iconPosition === 'right' && (
        <Image source={icon} style={[styles.icon, iconStyle]} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    backgroundColor: 'rgba(32, 201, 151, 1)',
    borderRadius: 48,
  },
  text: {
    color: 'rgba(24, 23, 28, 1)',
    fontSize: 18,
    fontFamily: CustomFont.Urbanist600,
    marginHorizontal: 5,
    lineHeight: 21.6,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default CustomButton;

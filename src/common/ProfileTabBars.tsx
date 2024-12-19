import React, {memo} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';

interface ProfileTab {
  title: String;
  icon: any;
  customStyle?: ViewStyle;
  otherText?: String;
  wantBottomBorder?: boolean;
  OnPressHandler?:() => void
}

const ProfileTab: React.FC<ProfileTab> = memo(
  ({title, icon, customStyle, otherText, wantBottomBorder,OnPressHandler}) => {
    return (
      <TouchableOpacity onPress={OnPressHandler}
        style={[
          styles.container,
          wantBottomBorder && styles.bottomBorderStyle,
          customStyle,
        ]}>
        <View style={styles.innerContainer}>
          <View style={styles.iconBox}>
            <Image source={icon} style={styles.icon} />
          </View>

          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightBox}>
          {otherText && <Text style={styles.otherTextStyle}>{otherText}</Text>}
          <Image
            source={CustomImages.grayTabIcon}
            tintColor={'rgba(149, 149, 157, 1)'}
            style={styles.tabIcon}
          />
        </View>
      </TouchableOpacity>
    );
  },
);

export default ProfileTab;

const styles = StyleSheet.create({
  bottomBorderStyle: {
    borderBottomColor: 'rgba(47, 47, 55, 1)',
    borderBottomWidth: 1,
  },
  rightBox: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
  },
  otherTextStyle: {
    fontSize: 14,
    lineHeight: 16.8,
    fontFamily: CustomFont.Urbanist500,
    color: 'rgba(149, 149, 157, 1)',
    marginRight: 19,
  },
  tabIcon: {
    width: 9,
    height: 28,
  },
  innerContainer: {
    flexDirection: 'row',
    columnGap: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 19.2,
    color: 'rgba(250, 250, 250, 1)',
    fontFamily: CustomFont.Urbanist400,
  },
  icon: {
    width: 15,
    height: 15,
  },
  iconBox: {
    backgroundColor: 'rgba(47, 47, 55, 1)',
    paddingHorizontal: 7,
    paddingVertical: 7,
    borderRadius: 28,
  },
  container: {
    backgroundColor: 'rgba(32, 33, 38, 1)',
    padding: 12,
    paddingLeft: 0,
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

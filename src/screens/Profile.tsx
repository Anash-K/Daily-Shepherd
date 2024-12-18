import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import ScreenWrapper from '../common/ScreenWrapper';
import CustomButton from '../common/CustomButton';
import CustomFont from '../assets/customFonts';
import CustomImages from '../assets/customImages';
import ProfileTab from '../common/ProfileTabBars';
import React, {useCallback} from 'react';
import {ScreenProps} from '../navigation/Stack';

const Profile: React.FC<ScreenProps<'Profile'>> = ({navigation}) => {
  const handleEditProfilePic = useCallback(() => {
    navigation.navigate('EditProfilePic');
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topHeader}>
        <Image source={CustomImages.profilePict} style={styles.profilePic} />
        <View>
          <Text style={styles.profileName}>Christopher Bell</Text>
          <CustomButton
            text="Edit profile"
            onPress={handleEditProfilePic}
            buttonStyle={styles.editButton}
            textStyle={styles.editText}
          />
        </View>
      </View>
      <ProfileTab
        icon={CustomImages.heartIcon}
        title={'Favorites'}
        customStyle={{borderRadius: 12, marginLeft: 0, paddingLeft: 12}}
      />

      {/* Personalize section  */}
      <View style={styles.profileSection}>
        <View style={styles.titleBox}>
          <Text style={styles.boxHeading}>Personalize</Text>
        </View>

        <View>
          <ProfileTab
            icon={CustomImages.artIcon}
            title={'Appearance'}
            otherText={'DARK'}
            wantBottomBorder={true}
          />
          <ProfileTab
            icon={CustomImages.fontSizeIcon}
            title={'Font Size'}
            otherText={'MEDIUM'}
            wantBottomBorder={true}
          />
          <ProfileTab icon={CustomImages.bellIcon} title={'Notifications'} />
        </View>
      </View>

      {/* General section  */}
      <View style={styles.profileSection}>
        <View style={styles.titleBox}>
          <Text style={styles.boxHeading}>General</Text>
        </View>

        <View>
          <ProfileTab
            icon={CustomImages.contactIcon}
            title={'Contact Support'}
            wantBottomBorder={true}
          />
          <ProfileTab
            icon={CustomImages.infoIcon}
            title={'About Us'}
            wantBottomBorder={true}
          />
          <ProfileTab icon={CustomImages.termsIcon} title={'Terms & Privacy'} />
        </View>
      </View>

      {/* Account section  */}
      <View style={styles.profileSection}>
        <View style={styles.titleBox}>
          <Text style={styles.boxHeading}>Account</Text>
        </View>

        <View>
          <ProfileTab
            icon={CustomImages.passwordIcon}
            title={'Change Password'}
            wantBottomBorder={true}
          />
          <ProfileTab
            icon={CustomImages.trash}
            title={'Delete Account'}
            wantBottomBorder={true}
          />
          <ProfileTab icon={CustomImages.powerIcon} title={'Logout'} />
        </View>
      </View>

      <View style={styles.versionBox}>
        <Image source={CustomImages.greyLogo} style={styles.versionLogo} />
        <Text style={styles.versionText}>Version 1.1.1</Text>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  versionLogo: {
    width: 64,
    height: 46,
  },
  versionBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 48,
    rowGap: 6,
  },
  versionText: {
    color: 'rgba(149, 149, 157, 1)',
    fontSize: 14,
    lineHeight: 16.8,
    fontFamily: CustomFont.Urbanist400,
  },
  titleBox: {
    borderBottomColor: 'rgba(47, 47, 55, 1)',
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  profileSection: {
    backgroundColor: 'rgba(32, 33, 38, 1)',
    marginTop: 24,
    paddingTop: 12,
    borderRadius: 12,
  },
  boxHeading: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 16,
    lineHeight: 19.2,
    color: 'rgba(250, 250, 250, 1)',
    borderLeftColor: 'rgba(32, 201, 151, 1)',
    borderLeftWidth: 3,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    paddingLeft: 12,
  },
  container: {
    padding: 16,
  },
  profilePic: {
    width: 80,
    height: 80,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 16,
    borderBottomColor: 'rgba(250, 250, 250, 0.05)',
    borderBottomWidth: 1,
    paddingBottom: 24,
    marginBottom: 24,
  },
  editButton: {
    backgroundColor: 'rgba(32, 33, 38, 1)',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 48,
  },
  editText: {
    color: 'rgba(250, 250, 250, 1)',
  },
  profileName: {
    color: 'rgba(250, 250, 250, 1)',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: CustomFont.Urbanist600,
  },
});

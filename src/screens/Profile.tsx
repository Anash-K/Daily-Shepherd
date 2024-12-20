import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import ScreenWrapper from '../common/ScreenWrapper';
import CustomButton from '../common/CustomButton';
import CustomFont from '../assets/customFonts';
import CustomImages from '../assets/customImages';
import ProfileTab from '../common/ProfileTabBars';
import React, {useCallback, useState} from 'react';
import {ScreenProps} from '../navigation/Stack';
import Appearance from '../modals/Appearance';
import FontSizeModal from '../modals/FontSizeModal';
import NotificationsModal from '../modals/NotificationModal';
import PowerModal from '../modals/PowerModal';
import {useDispatch} from 'react-redux';
import {logout} from '../store/reducers/AuthReducer';
interface Mode {
  LightTheme: boolean;
  DarkTheme: boolean;
  DeviceTheme: boolean;
}

interface CustomFontSize {
  Small: boolean;
  Medium: boolean;
  Large: boolean;
}

const Profile: React.FC<ScreenProps<'Profile'>> = ({navigation}) => {
  const ThemeMode = {
    LightTheme: false,
    DarkTheme: true,
    DeviceTheme: false,
  };

  const CustomFontSize = {
    Small: false,
    Medium: true,
    Large: false,
  };

  const dispatch = useDispatch();

  const [isAppearanceOpen, setIsAppearance] = useState(false);
  const [isFontResizerOpen, setIsFontResizer] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [mode, setMode] = useState<Mode>(ThemeMode);
  const [fontResizer, setFontResizer] =
    useState<CustomFontSize>(CustomFontSize);

  const handleNav = useCallback((title: String) => {
    navigation.navigate(title);
  }, []);

  const handleAppearanceModal = useCallback((name: keyof Mode) => {
    setMode(prevState => {
      const updatedState = Object.keys(prevState).reduce((acc, key) => {
        acc[key as keyof Mode] = key === name;
        return acc;
      }, {} as Mode);
      return updatedState;
    });
  }, []);

  const handleFontResizerModal = useCallback((name: keyof CustomFontSize) => {
    setFontResizer(prevState => {
      const updatedState = Object.keys(prevState).reduce((acc, key) => {
        acc[key as keyof CustomFontSize] = key === name;
        return acc;
      }, {} as CustomFontSize);
      return updatedState;
    });
  }, []);

  const toggleAppearanceModal = useCallback(() => {
    setIsAppearance(prevState => !prevState);
  }, []);

  const toggleFontResizerModal = useCallback(() => {
    setIsFontResizer(prevState => !prevState);
  }, []);

  const toggleNotificationModal = useCallback(() => {
    setIsNotificationOpen(prevState => !prevState);
  }, []);

  const toggleLogoutModal = useCallback(() => {
    setIsLogoutVisible(prevState => !prevState);
  }, []);

  const toggleDeleteModal = useCallback(() => {
    setIsDeleteModal(prevState => !prevState);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLogoutVisible(false);
    dispatch(logout());
  }, []);
  const handleDelete = useCallback(() => {}, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topHeader}>
        <Image source={CustomImages.profilePict} style={styles.profilePic} />
        <View>
          <Text style={styles.profileName}>Christopher Bell</Text>
          <CustomButton
            text="Edit profile"
            onPress={handleNav.bind(null, 'EditProfilePic')}
            buttonStyle={styles.editButton}
            textStyle={styles.editText}
          />
        </View>
      </View>
      <ProfileTab
        icon={CustomImages.heartIcon}
        title={'Favorites'}
        OnPressHandler={handleNav.bind(null, 'Favorites')}
        customStyle={{borderRadius: 12, marginLeft: 0, paddingLeft: 12}}
      />

      {/* Personalize section  */}
      <View style={styles.profileSection}>
        <View style={styles.titleBox}>
          <View style={styles.miniTitleIcon} />
          <Text style={styles.boxHeading}>Personalize</Text>
        </View>

        <View>
          <ProfileTab
            icon={CustomImages.artIcon}
            title={'Appearance'}
            OnPressHandler={toggleAppearanceModal}
            otherText={
              Object.keys(mode)
                .find(key => mode[key as keyof Mode])
                ?.replace(/Theme$/, '')
                .toUpperCase() || 'LIGHT'
            }
            wantBottomBorder={true}
          />

          <ProfileTab
            icon={CustomImages.fontSizeIcon}
            title={'Font Size'}
            OnPressHandler={toggleFontResizerModal}
            otherText={
              Object.keys(fontResizer)
                .find(key => fontResizer[key as keyof CustomFontSize])
                ?.replace(/Theme$/, '')
                .toUpperCase() || 'Small'
            }
            wantBottomBorder={true}
          />
          <ProfileTab
            icon={CustomImages.bellIcon}
            title={'Notifications'}
            OnPressHandler={toggleNotificationModal}
          />
        </View>
      </View>

      {/* General section  */}
      <View style={styles.profileSection}>
        <View style={styles.titleBox}>
          <View style={styles.miniTitleIcon} />
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
          <View style={styles.miniTitleIcon} />
          <Text style={styles.boxHeading}>Account</Text>
        </View>

        <View>
          <ProfileTab
            icon={CustomImages.passwordIcon}
            title={'Change Password'}
            wantBottomBorder={true}
            OnPressHandler={() => navigation.navigate('ChangePassword')}
          />
          <ProfileTab
            icon={CustomImages.trash}
            title={'Delete Account'}
            wantBottomBorder={true}
            OnPressHandler={toggleDeleteModal}
          />
          <ProfileTab
            icon={CustomImages.powerIcon}
            title={'Logout'}
            OnPressHandler={toggleLogoutModal}
          />
        </View>
      </View>

      <View style={styles.versionBox}>
        <Image source={CustomImages.greyLogo} style={styles.versionLogo} />
        <Text style={styles.versionText}>Version 1.1.1</Text>
      </View>
      <Appearance
        isModalVisible={isAppearanceOpen}
        toggleModal={toggleAppearanceModal}
        handleButtons={handleAppearanceModal}
        mode={mode}
      />
      <FontSizeModal
        isModalVisible={isFontResizerOpen}
        toggleModal={toggleFontResizerModal}
        handleButtons={handleFontResizerModal}
        mode={fontResizer}
      />
      <NotificationsModal
        isModalVisible={isNotificationOpen}
        toggleModal={toggleNotificationModal}
      />
      <PowerModal
        isModalVisible={isDeleteModal}
        toggleModal={toggleDeleteModal}
        contentText={
          'Your journey here matters. Are you sure you want to leave?'
        }
        handleAction={handleDelete}
        Logo={CustomImages.trashLogo}
        ActionText={'Delete Account'}
      />
      <PowerModal
        isModalVisible={isLogoutVisible}
        toggleModal={toggleLogoutModal}
        contentText={
          'Take a break! We’ll keep your spot warm until you’re back.'
        }
        handleAction={handleLogout}
        Logo={CustomImages.logoutIcon}
        ActionText={'Logout'}
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  miniTitleIcon: {
    borderLeftColor: 'rgba(32, 201, 151, 1)',
    borderLeftWidth: 3,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 3,
  },
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
    flexDirection: 'row',
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

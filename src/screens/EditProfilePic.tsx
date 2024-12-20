import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomFont from '../assets/customFonts';
import CustomImages from '../assets/customImages';
import CustomButton from '../common/CustomButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import CustomInput from '../common/CustomInput';
import {ScreenProps} from '../navigation/Stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const EditProfilePic: React.FC<ScreenProps<'EditProfilePic'>> = ({
  navigation,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('Christopher Bell');
  const [email, setEmail] = useState('christbell@gmail.com');

  const toggleModal = useCallback(() => {
    setModalVisible(prev => !prev);
  }, []);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleConfirm = () => {
    navigation.goBack();
  };

  // Request and check for camera permission when the component mounts
  useEffect(() => {
    const checkPermission = async () => {
      const cameraPermission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA;

      const status = await check(cameraPermission);
      if (status === RESULTS.DENIED) {
        const requestStatus = await request(cameraPermission);
        if (requestStatus === RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } else if (status === RESULTS.GRANTED) {
        console.log('Camera permission already granted');
      } else {
        console.log('Permission status: ', status);
      }
    };

    checkPermission();
  }, []);

  const options = {
    mediaType: 'photo',
    maxWidth: '100%',
    maxHeight: '100%',
    quality: 1,
    includeBase64: true,
  };

  const handleCamera = useCallback(
    async (isClose: Boolean) => {
      if (isClose) {
        toggleModal();
      }
      try {
        launchCamera(
          {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            includeBase64: true,
          },
          response => {
            if (response.didCancel) {
              console.log('User cancelled camera picker');
            } else if (response.errorCode) {
              console.log(
                'Camera Error: ',
                response.errorCode,
                response.errorMessage,
              );
            } else if (response.assets && response.assets.length > 0) {
              const uri = response.assets[0]?.uri;
              if (uri) {
                setProfileImage(uri);
              } else {
                console.error('Photo URI is undefined');
              }
            }
          },
        );
      } catch (error) {
        console.error('Camera error:', error);
      }
    },
    [toggleModal],
  );

  const handleGallery = useCallback(
    async (isClose: Boolean) => {
      if (isClose) {
        toggleModal();
      }
      try {
        launchImageLibrary(
          {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            includeBase64: true,
          },
          response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.errorCode) {
              console.log(
                'Gallery Error: ',
                response.errorCode,
                response.errorMessage,
              );
            } else if (response.assets && response.assets.length > 0) {
              const uri = response.assets[0]?.uri;
              if (uri) {
                setProfileImage(uri);
              } else {
                console.error('Photo URI is undefined');
              }
            }
          },
        );
      } catch (error) {
        console.error('Gallery error:', error);
      }
    },
    [toggleModal],
  );

  const handleChange = useCallback(() => {}, []);

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: Platform.select({
            ios: insets.bottom,
            android: insets.bottom + 30,
          }),
        },
      ]}>
      <View style={{flexGrow: 1}}>
        <TouchableOpacity style={styles.imageBox} onPress={toggleModal}>
          <Image
            source={
              profileImage ? {uri: profileImage} : CustomImages.profilePict
            }
            style={[styles.profilePicture]}
            resizeMode="cover"
          />
          <View style={styles.ActionIconBox}>
            <Image
              source={
                // profileImage ? CustomImages.editIcon : CustomImages.addIcon
                CustomImages.editIcon
              }
              tintColor={'rgba(24, 23, 28, 1)'}
              style={styles.picAction}
            />
          </View>
        </TouchableOpacity>
        <CustomInput
          label="Name"
          onChange={value => setName(value)}
          inputConfigurations={{value: name}}
        />
        <CustomInput
          label="Email"
          onChange={value => setEmail(value)}
          inputConfigurations={{value: email, editable: false}}
          isDisabled={true}
        />
      </View>

      <CustomButton text="Update profile" onPress={handleConfirm} />

      {/* Modal for photo selection */}
      {isModalVisible && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => {
                  toggleModal();
                }}
                style={styles.closeButton}>
                <Image
                  source={CustomImages.closeIcon}
                  style={styles.closeIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={{backgroundColor: '#18171C', borderRadius: 15}}>
                <CustomButton
                  text="Choose from Gallery"
                  onPress={handleGallery.bind(this, true)}
                  textStyle={styles.menuItemText}
                  buttonStyle={styles.menuItemStyle}
                  icon={CustomImages.photoGallery}
                  iconStyle={{backgroundColor: '#3a393d', borderRadius: 4}}
                />
                <CustomButton
                  text="Use Camera"
                  onPress={handleCamera.bind(this, true)}
                  textStyle={styles.menuItemText}
                  buttonStyle={styles.menuItemStyle}
                  icon={CustomImages.cameraIcon}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default EditProfilePic;

const styles = StyleSheet.create({
  ActionIconBox: {
    position: 'absolute',
    backgroundColor: 'rgba(32, 201, 151, 1)',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(24, 23, 28, 1)',
    padding: 10,
    right: 0,
    bottom: 0,
  },
  picAction: {
    width: 16,
    height: 16,
  },
  tryAgainButton: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(56, 57, 62, 1)',
    borderWidth: 1,
    marginBottom: 12,
  },
  tryAgainText: {
    color: 'rgba(250, 250, 250, 1)',
  },
  container: {
    flex: 1,
    padding: 16,
    marginBottom: Platform.select({ios: 0, android: 10}),
  },
  title: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 24,
    lineHeight: 28.8,
    textAlign: 'center',
    color: 'rgba(250, 250, 250, 1)',
  },
  subTitle: {
    color: 'rgba(147, 150, 157, 1)',
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 19.2,
    textAlign: 'center',
    letterSpacing: 0.5,
    marginTop: 8,
  },
  profilePicture: {
    width: 125,
    height: 125,
    alignSelf: 'center',
    borderRadius: 125 / 2,
  },
  imageBox: {
    marginTop: 32,
    marginBottom: 22,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  closeIcon: {
    width: 40,
    height: 40,
  },

  menuItemStyle: {
    paddingVertical: 17,
    borderBottomColor: 'rgba(29, 30, 35, 1)',
    backgroundColor: 'transparent',
    borderBottomWidth: 1.5,
    marginHorizontal: 0,
    justifyContent: 'flex-start',
    borderRadius: 0,
  },
  menuItemText: {
    fontSize: 16,
    color: '#FAFAFA',
    textAlign: 'left',
    marginHorizontal: 0,
    marginVertical: 0,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '100%',
    padding: 16,
    borderRadius: 10,
    position: 'absolute',
    bottom: 10,
    zIndex: 100,
  },
  closeButton: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});

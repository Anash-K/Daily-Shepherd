import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  InteractionManager,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import CustomFont from '../assets/customFonts';
import CustomImages from '../assets/customImages';
import CustomButton from '../common/CustomButton';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import CustomInput from '../common/CustomInput';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import PermissionModal from '../modals/PermissionModal';
import {useSelector} from 'react-redux';
import {ScreenProps} from '../navigation/Stack';
import {UpdateProfile} from '../axious/PostApis';
import {ErrorHandler} from '../utils/ErrorHandler';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const ProfilePicture: React.FC<ScreenProps<'ProfilePicture'>> = ({
  navigation,
}) => {
  const userData = useSelector((state: any) => state.auth);
  const [isModalVisible, setModalVisible] = useState(false);
  const [permissionError, setPermissionError] = useState('');
  const [name, setName] = useState('test');
  const [email, setEmail] = useState(userData.email);
  const buttonRef = useRef<boolean>(false);

  const toggleModal = useCallback(() => {
    setModalVisible(prev => !prev);
  }, []);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isPermissionModalVisible, setPermissionModalVisible] = useState(false);

  useEffect(() => {
    console.log(profileImage, 'profileImage');
  }, [profileImage]);

  const handleConfirm = () => {};

  const handleNextNav = useCallback(() => {
    navigation.navigate('NotificationPreferences');
  }, [navigation]);

  // Request and check for camera permission when the component mounts
  const checkAndRequestPermission = useCallback(async () => {
    const cameraPermission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;

    try {
      const status = await check(cameraPermission);

      if (status === RESULTS.GRANTED) {
        return;
      }
      if (status === RESULTS.DENIED) {
        const requestStatus = await request(cameraPermission);
        if (requestStatus !== RESULTS.GRANTED) {
        }
      } else if (status === RESULTS.BLOCKED) {
        setPermissionError('Permission Needed to Access Camera');
        setPermissionModalVisible(true);
      }
    } catch (error) {
      console.error('Permission error:', error);
    }
  }, []);

  useEffect(() => {
    checkAndRequestPermission();
  }, [checkAndRequestPermission]);

  const options = {
    mediaType: 'photo',
    maxWidth: '100%',
    maxHeight: '100%',
    quality: 1,
    includeBase64: true,
  };

  const handleGalleryModal = useCallback(() => {
    setModalVisible(false);
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        handleGallery();
      }, 700);
    });
  }, []);

  const handleCameraModal = useCallback(() => {
    setModalVisible(false);
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        handleCamera();
      }, 700);
    });
  }, []);

  const handleCamera = useCallback(async (isClose?: Boolean) => {
    checkAndRequestPermission();
    try {
      let response = await ImagePicker.openCamera({
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        includeBase64: true,
        cropping: true,
      });

      // Process the image if the path exists
      if (response.path) {
        setProfileImage(response.path);
      }
    } catch (error) {
      console.error('Camera error:', error);
    }
  }, []);

  const handleGallery = useCallback(async (isClose?: Boolean) => {
    checkAndRequestPermission();
    try {
      let response = await ImagePicker.openPicker({
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        includeBase64: true,
        cropping: true,
      });

      if (response.path) {
        setProfileImage(response.path);
      }
    } catch (error) {
      console.error('Gallery error:', error);
    }
  }, []);

  const handleChangeName = useCallback(() => {}, []);
  const handleChangeEmail = useCallback(() => {}, []);

  const togglePermissionModal = useCallback(() => {
    setPermissionModalVisible(prevState => !prevState);
  }, []);

  const insets = useSafeAreaInsets();

  const handleSubmit = useCallback(async () => {
    if (buttonRef.current) {
      return;
    }
    buttonRef.current = true;
  
    const data = { name: name, profile: profileImage };
  
    console.log(data, "request info data");
  
    try {
      const response = await UpdateProfile(data);
      console.log(response, 'API response');
  
      // Check if response is valid and status is success
      if (response && response.status === 200) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Profile Updated Successfully!',
        });
      } else {
        // Handle unexpected response status
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Something went wrong, please try again.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      // Call your custom error handler function
      ErrorHandler(error);
    } finally {
      // Reset buttonRef to allow submitting again
      buttonRef.current = false;
    }
  }, [name, profileImage]); // Ensure dependencies are correct
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={[
            styles.container,
            {
              paddingBottom: Platform.select({
                ios: insets.bottom + 10,
                android: 35,
              }),
            },
          ]}>
          <View style={{flexGrow: 1}}>
            <Pressable style={styles.imageBox} onPress={toggleModal}>
              <Image
                source={
                  profileImage ? {uri: profileImage} : CustomImages.profilePic
                }
                style={[styles.profilePicture]}
                resizeMode="cover"
              />
              <View style={styles.ActionIconBox}>
                <Image
                  source={
                    profileImage ? CustomImages.editIcon : CustomImages.addIcon
                  }
                  style={styles.picAction}
                />
              </View>
            </Pressable>
            <CustomInput
              label="Name"
              onChange={value => setName(value)}
              inputConfigurations={{value: name}}
            />
            <CustomInput
              label="Email"
              onChange={handleChangeEmail}
              isDisabled={true}
              inputConfigurations={{value: email, editable: false}}
            />
          </View>

          <CustomButton text="Continue" onPress={handleSubmit} />

          {/* Modal for photo selection */}
          <PermissionModal
            isModalVisible={isPermissionModalVisible}
            toggleModal={togglePermissionModal}
            contentText={permissionError}
          />
          {isModalVisible ? (
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
                      onPress={handleGalleryModal}
                      textStyle={styles.menuItemText}
                      buttonStyle={styles.menuItemStyle}
                      icon={CustomImages.photoGallery}
                      iconStyle={{backgroundColor: '#3a393d', borderRadius: 4}}
                    />
                    <CustomButton
                      text="Use Camera"
                      onPress={handleCameraModal}
                      textStyle={styles.menuItemText}
                      buttonStyle={[
                        styles.menuItemStyle,
                        {borderBottomWidth: 0},
                      ]}
                      icon={CustomImages.cameraIcon}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          ) : (
            <></>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ProfilePicture;

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
    bottom: Platform.select({ios: 27, android: 10}),
    zIndex: 100,
  },
  closeButton: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});

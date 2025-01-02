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
import {useDispatch, useSelector} from 'react-redux';
import {ScreenProps} from '../navigation/Stack';
import {UpdateProfile} from '../axious/PostApis';
import {ErrorHandler} from '../utils/ErrorHandler';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {getFileNameFromUri, getMimeTypeFromUri} from '../utils/MimeTypePicker';
import {AppLoaderRef} from '../../App';
import {CustomToaster} from '../utils/AlertNotification';
import {updateProfile} from '../store/reducers/AuthReducer';
import {Text} from 'react-native-paper';
import Loader from '../utils/Loader';
import CustomImageHandler from '../utils/CustomImageHandler';

interface buttonRef {
  start: () => void;
  stop: () => void;
}

const EditProfilePic: React.FC<ScreenProps<'EditProfilePic'>> = ({
  navigation,
}) => {
  const userData = useSelector((state: any) => state.auth);

  const nameValidation = {
    text: userData.name ? userData.name : '',
    error: '',
    isValid: false,
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [permissionError, setPermissionError] = useState('');
  const [name, setName] = useState(nameValidation);
  const [email, setEmail] = useState(userData.email);
  const buttonRef = React.createRef<buttonRef>();
  const dispatch = useDispatch();

  const toggleModal = useCallback(() => {
    setModalVisible(prev => !prev);
  }, []);

  const [profileImage, setProfileImage] = useState<string | null>(
    userData.profile ? userData.profile : null,
  );
  const [isPermissionModalVisible, setPermissionModalVisible] = useState(false);
  const lastSubmittedImageRef = useRef<string | null>(null);

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
        width: 300,
        height: 300,
        quality: 1,
        includeBase64: true,
        cropping: true,
      });

      // Process the image if the path exists
      if (response.path) {
        getMimeTypeFromUri(response.path);

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
        width: 300,
        height: 300,
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

  const handleChangeName = useCallback(
    (value: string) => {
      if (!value || value.trim() === '') {
        setName({
          text: '',
          error: 'Name cannot be empty',
          isValid: false,
        });
      } else if (value.length < 3) {
        setName({
          text: value,
          error: 'Name must be at least 3 characters',
          isValid: false,
        });
      } else {
        setName({
          text: value,
          error: '',
          isValid: true,
        });
      }
    },
    [name],
  );

  const handleChangeEmail = useCallback(() => {}, []);

  const togglePermissionModal = useCallback(() => {
    setPermissionModalVisible(prevState => !prevState);
  }, []);

  const insets = useSafeAreaInsets();

  const handleBackNav = useCallback(() => {
    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (buttonRef.current?.start()) {
      return;
    }

    buttonRef.current?.start();

    AppLoaderRef.current?.start();

    let ImageType = '';
    let ImageName = '';

    if (profileImage) {
      ImageType = getMimeTypeFromUri(profileImage);
      ImageName = getFileNameFromUri(profileImage);

      if (lastSubmittedImageRef.current === profileImage) {
        buttonRef.current?.stop();
        AppLoaderRef.current?.stop();
        return;
      }
    }

    const data = {
      name: name.text,
      profile: {
        uri: profileImage,
        type: ImageType,
        name: ImageName,
      },
    };

    try {
      const response = await UpdateProfile(data);

      // Check if response is valid and status is success
      if (response && response?.status === 200) {
        lastSubmittedImageRef.current = profileImage;
        dispatch(updateProfile(response?.data?.payload));
        CustomToaster({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          message: 'Profile Updated Successfully!',
        });
        handleBackNav();
      } else {
        // Handle unexpected response status
        CustomToaster({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          message: 'Something went wrong, please try again.',
        });
      }
    } catch (error) {
      ErrorHandler(error);
    } finally {
      buttonRef.current?.stop();
      AppLoaderRef.current?.stop();
    }
  }, [name, profileImage]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={[
            styles.container,
            {
              paddingBottom: Platform.select({
                ios: insets.bottom + 10,
                android: 25,
              }),
            },
          ]}>
          <View style={{flexGrow: 1}}>
            <Pressable style={styles.imageBox} onPress={toggleModal}>
              <CustomImageHandler
                sourceImage={profileImage}
                placeholderImage={CustomImages.profilePic}
                imageStyle={styles.profilePicture}
              />
              {/* <Image
                source={
                  profileImage ? {uri: profileImage} : CustomImages.profilePic
                }
                style={[styles.profilePicture]}
                resizeMode="cover"
              /> */}
              <View style={styles.ActionIconBox}>
                <Image
                  source={
                    profileImage ? CustomImages.editIcon : CustomImages.addIcon
                  }
                  style={styles.picAction}
                />
              </View>
            </Pressable>
            <View>
              <CustomInput
                label="Name"
                onChange={handleChangeName}
                inputConfigurations={{value: name.text}}
              />
              {name.error && (
                <Text
                  style={{
                    color: 'red',
                    fontSize: 10,
                    position: 'absolute',
                    bottom: 5,
                  }}>
                  {name.error}
                </Text>
              )}
            </View>

            <CustomInput
              label="Email"
              onChange={handleChangeEmail}
              isDisabled={true}
              inputConfigurations={{value: email, editable: false}}
            />
          </View>

          <CustomButton
            text="Continue"
            onPress={handleSubmit}
            buttonStyle={{marginBottom: 10}}
          />

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
              <Pressable style={styles.modalOverlay} onPress={toggleModal}>
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
                      buttonStyle={styles.menuItemStyleBottom}
                      icon={CustomImages.cameraIcon}
                    />
                  </View>
                </View>
              </Pressable>
            </Modal>
          ) : (
            <></>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    resizeMode: 'cover',
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
  menuItemStyleBottom: {
    borderBottomWidth: 0,
    paddingVertical: 17,
    borderBottomColor: 'rgba(29, 30, 35, 1)',
    backgroundColor: 'transparent',
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

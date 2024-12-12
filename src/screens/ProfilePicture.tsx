import React, {useEffect, useState} from 'react';
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
import {Menu, MenuItem} from 'react-native-material-menu';

const ProfilePicture: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleConfirm = () => {};

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

  const handleCamera = async () => {
    toggleModal();
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
  };

  const handleGallery = async () => {
    toggleModal();
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
  };

  console.log(profileImage);

  return (
    <View style={styles.container}>
      <View style={{flexGrow: 1}}>
        <Text style={styles.title}>Add a profile picture</Text>
        <Text style={styles.subTitle}>
          Add profile photo so that your friends know it’s you.
        </Text>
        <TouchableOpacity style={styles.imageBox}>
          <Image
            source={
              profileImage ? {uri: profileImage} : CustomImages.profilePic
            }
            style={[styles.profilePicture]}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      <CustomButton text="Upload photo" onPress={toggleModal} />
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
                  console.log('TouchableOpacity pressed');
                  toggleModal(); // Assuming toggleModal is the function to open the modal
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
                  onPress={handleGallery}
                  textStyle={styles.menuItemText}
                  buttonStyle={styles.menuItemStyle}
                />
                <CustomButton
                  text="Use Camera"
                  onPress={handleCamera}
                  textStyle={styles.menuItemText}
                  buttonStyle={styles.menuItemStyle}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
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

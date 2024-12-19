import React, {memo} from 'react';
import {
  Image,
  ImageProps,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomFont from '../assets/customFonts';

interface Mode {
  LightTheme: boolean;
  DarkTheme: boolean;
  DeviceTheme: boolean;
}

interface PowerModalProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  handleAction: () => void;
  Logo: ImageProps;
  ActionText: String;
  contentText: String;
}

const PowerModal: React.FC<PowerModalProps> = memo(
  ({
    isModalVisible,
    toggleModal,
    handleAction,
    Logo,
    ActionText,
    contentText,
  }) => {
    const handlePress = () => {};
    return (
      <>
        {isModalVisible && (
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={styles.closeButton}>
                  <Image
                    source={Logo}
                    style={styles.closeIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <View style={{backgroundColor: '#18171C', borderRadius: 15}}>
                  <View
                    style={{borderColor: '#1D1E23', borderBottomWidth: 1.5}}>
                    <Text style={styles.modalTitle}>{contentText}</Text>
                  </View>
                  <TouchableOpacity style={styles.button}>
                    <Text style={[styles.buttonText, {color: '#EF4355'}]}>
                      {ActionText}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </>
    );
  },
);

export default PowerModal;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderTopColor: '#232329',
    borderTopWidth: 1,
    marginHorizontal: 16,
  },
  buttonText: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 18,
    lineHeight: 21.6,
    color: '#8A909B',
    textAlign: 'center',
  },
  modalTitle: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 20,
    lineHeight: 24,
    color: 'rgba(250, 250, 250, 1)',
    margin: 16,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '100%',
    borderRadius: 10,
    position: 'absolute',
    zIndex: 100,
  },
  closeButton: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  closeIcon: {
    width: 40,
    height: 40,
  },
});

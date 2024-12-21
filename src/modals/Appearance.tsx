import React, {memo} from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../common/CustomButton';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';

interface Mode {
  LightTheme: boolean;
  DarkTheme: boolean;
  DeviceTheme: boolean;
}

interface AppearanceProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  handleButtons: (name: keyof Mode) => void;
  mode: Mode;
}

const Appearance: React.FC<AppearanceProps> = memo(
  ({isModalVisible, toggleModal, handleButtons, mode}) => {
    const handlePress = () => {};
    return (
      <>
        {isModalVisible && (
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleModal}>
            <Pressable style={styles.modalOverlay} onPress={toggleModal}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={styles.closeButton}>
                  <Image
                    source={CustomImages.closeIcon}
                    style={styles.closeIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <View style={{backgroundColor: '#18171C', borderRadius: 15}}>
                  <View
                    style={{borderColor: '#1D1E23', borderBottomWidth: 1.5}}>
                    <Text style={styles.modalTitle}>Appearance</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.menuItemStyle}
                    onPress={() => handleButtons('LightTheme')}>
                    <Text style={styles.menuItemText}>Light Theme</Text>
                    <View
                      style={[
                        styles.DotBorder,
                        !mode.LightTheme && {
                          borderColor: 'rgba(86, 86, 92, 1)',
                        },
                      ]}>
                      <View
                        style={[
                          styles.dotStyle,
                          !mode.LightTheme && {
                            backgroundColor: 'transparent',
                          },
                        ]}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItemStyle}
                    onPress={() => handleButtons('DarkTheme')}>
                    <Text style={styles.menuItemText}>Dark Theme</Text>
                    <View
                      style={[
                        styles.DotBorder,
                        !mode.DarkTheme && {borderColor: 'rgba(86, 86, 92, 1)'},
                      ]}>
                      <View
                        style={[
                          styles.dotStyle,
                          !mode.DarkTheme && {
                            backgroundColor: 'transparent',
                          },
                        ]}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItemStyle}
                    onPress={() => handleButtons('DeviceTheme')}>
                    <Text style={styles.menuItemText}>Device Theme</Text>
                    <View
                      style={[
                        styles.DotBorder,
                        !mode.DeviceTheme && {
                          borderColor: 'rgba(86, 86, 92, 1)',
                        },
                      ]}>
                      <View
                        style={[
                          styles.dotStyle,
                          !mode.DeviceTheme && {
                            backgroundColor: 'transparent',
                          },
                        ]}
                      />
                    </View>
                  </TouchableOpacity>
                  <CustomButton
                    text="Save preference"
                    onPress={toggleModal}
                    buttonStyle={{
                      marginHorizontal: 16,
                      marginVertical: 16,
                      marginBottom: Platform.select({ios: 40, android: 40}),
                    }}
                  />
                </View>
              </View>
            </Pressable>
          </Modal>
        )}
      </>
    );
  },
);

export default Appearance;

const styles = StyleSheet.create({
  modalTitle: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 20,
    lineHeight: 24,
    color: 'rgba(250, 250, 250, 1)',
    margin: 16,
  },
  DotBorder: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(32, 201, 151, 1)',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    backgroundColor: 'rgba(32, 201, 151, 1)',
    borderRadius: 6,
    width: 11.5,
    height: 11.5,
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
    bottom: 10,
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

  menuItemStyle: {
    paddingVertical: 17,
    borderBottomColor: 'rgba(29, 30, 35, 1)',
    backgroundColor: 'transparent',
    borderBottomWidth: 1.5,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    borderRadius: 0,
    flexDirection: 'row',
  },
  menuItemText: {
    fontSize: 16,
    color: '#FAFAFA',
    textAlign: 'left',
    marginHorizontal: 0,
    marginVertical: 0,
  },
});

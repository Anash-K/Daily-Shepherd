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

interface CustomFontSize {
  Small: boolean;
  Medium: boolean;
  Large: boolean;
}

interface FontSizeModalProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  handleButtons: (name: keyof CustomFontSize) => void;
  mode: CustomFontSize;
}

const FontSizeModal: React.FC<FontSizeModalProps> = memo(
  ({isModalVisible, toggleModal, handleButtons, mode}) => {
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
                    <Text style={styles.modalTitle}>Font size</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.menuItemStyle}
                    onPress={() => handleButtons('Small')}>
                    <Text style={styles.menuItemText}>Small</Text>
                    <View
                      style={[
                        styles.DotBorder,
                        !mode.Small && {
                          borderColor: 'rgba(86, 86, 92, 1)',
                        },
                      ]}>
                      <View
                        style={[
                          styles.dotStyle,
                          !mode.Small && {
                            backgroundColor: 'transparent',
                          },
                        ]}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItemStyle}
                    onPress={() => handleButtons('Medium')}>
                    <Text style={styles.menuItemText}>Medium</Text>
                    <View
                      style={[
                        styles.DotBorder,
                        !mode.Medium && {borderColor: 'rgba(86, 86, 92, 1)'},
                      ]}>
                      <View
                        style={[
                          styles.dotStyle,
                          !mode.Medium && {
                            backgroundColor: 'transparent',
                          },
                        ]}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItemStyle}
                    onPress={() => handleButtons('Large')}>
                    <Text style={styles.menuItemText}>Large</Text>
                    <View
                      style={[
                        styles.DotBorder,
                        !mode.Large && {
                          borderColor: 'rgba(86, 86, 92, 1)',
                        },
                      ]}>
                      <View
                        style={[
                          styles.dotStyle,
                          !mode.Large && {
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

export default FontSizeModal;

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

import React, {memo, useState} from 'react';
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
import ToggleSwitch from 'toggle-switch-react-native';

interface AppearanceProps {
  isModalVisible: boolean;
  toggleModal: () => void;
}

const NotificationsModal: React.FC<AppearanceProps> = memo(
  ({isModalVisible, toggleModal}) => {
    const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
      toggle1: false,
      toggle2: false,
      toggle3: false,
    });

    const toggleSwitch = (key: string): void => {
      setToggleStates(prevState => ({
        ...prevState,
        [key]: !prevState[key],
      }));
    };

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
                    <Text style={styles.modalTitle}>Notifications</Text>
                  </View>

                  {/* First Toggle */}
                  <View style={styles.preference}>
                    <View>
                      <Text style={styles.text}>Verse only</Text>
                      <TouchableOpacity style={styles.timer}>
                        <Image
                          source={CustomImages.timerIcon}
                          resizeMode="contain"
                          style={styles.timerIcon}
                        />
                        <Text style={styles.timerText}>10:30</Text>
                      </TouchableOpacity>
                    </View>

                    <ToggleSwitch
                      isOn={toggleStates.toggle1}
                      onColor="rgba(24, 23, 28, 1)"
                      offColor="rgba(24, 23, 28, 1)"
                      size="small"
                      trackOnStyle={{
                        borderColor: 'rgba(32, 201, 151, 1)',
                        borderWidth: 1,
                      }}
                      trackOffStyle={{
                        borderColor: 'rgba(86, 86, 92, 1)',
                        borderWidth: 1,
                      }}
                      thumbOffStyle={styles.thumbStyleOff}
                      thumbOnStyle={styles.thumbStyleOn}
                      icon={
                        toggleStates.toggle1 ? (
                          <Image
                            source={CustomImages.rightIcon}
                            style={styles.toggleIcon}
                            resizeMode="contain"
                          />
                        ) : null
                      }
                      onToggle={() => toggleSwitch('toggle1')}
                    />
                  </View>

                  {/* Second Toggle */}
                  <View style={styles.preference}>
                    <Text style={styles.text}>Verse with reflection</Text>
                    <ToggleSwitch
                      isOn={toggleStates.toggle2}
                      onColor="rgba(24, 23, 28, 1)"
                      offColor="rgba(24, 23, 28, 1)"
                      size="small"
                      trackOnStyle={{
                        borderColor: 'rgba(32, 201, 151, 1)',
                        borderWidth: 1,
                      }}
                      trackOffStyle={{
                        borderColor: 'rgba(86, 86, 92, 1)',
                        borderWidth: 1,
                      }}
                      thumbOffStyle={styles.thumbStyleOff}
                      thumbOnStyle={styles.thumbStyleOn}
                      icon={
                        toggleStates.toggle2 ? (
                          <Image
                            source={CustomImages.rightIcon}
                            style={styles.toggleIcon}
                            resizeMode="contain"
                          />
                        ) : null
                      }
                      onToggle={() => toggleSwitch('toggle2')}
                    />
                  </View>

                  {/* Third Toggle */}
                  <View style={styles.preference}>
                    <Text style={styles.text}>Verse with teaching</Text>
                    <ToggleSwitch
                      isOn={toggleStates.toggle3}
                      onColor="rgba(24, 23, 28, 1)"
                      offColor="rgba(24, 23, 28, 1)"
                      size="small"
                      trackOnStyle={{
                        borderColor: 'rgba(32, 201, 151, 1)',
                        borderWidth: 1,
                      }}
                      trackOffStyle={{
                        borderColor: 'rgba(86, 86, 92, 1)',
                        borderWidth: 1,
                      }}
                      thumbOffStyle={styles.thumbStyleOff}
                      thumbOnStyle={styles.thumbStyleOn}
                      icon={
                        toggleStates.toggle3 ? (
                          <Image
                            source={CustomImages.rightIcon}
                            style={styles.toggleIcon}
                            resizeMode="contain"
                          />
                        ) : null
                      }
                      onToggle={() => toggleSwitch('toggle3')}
                    />
                  </View>
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

export default NotificationsModal;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: 'rgba(250, 250, 250, 1)',
    fontFamily: CustomFont.Urbanist400,
    lineHeight: 21.6,
  },
  preference: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    paddingVertical: 16,
    marginHorizontal: 16,
    borderBottomColor: '#232329',
    borderBottomWidth: 1,
  },
  toggleIcon: {
    width: 6,
    height: 4,
  },
  timerIcon: {
    width: 14,
    height: 14,
  },
  timer: {
    backgroundColor: 'rgba(32, 33, 38, 1)',
    flexDirection: 'row',
    columnGap: 8,
    borderRadius: 7,
    padding: 5,
    paddingHorizontal: 8,
    marginTop: 12,
  },
  timerText: {
    fontSize: 14,
    color: 'rgba(250, 250, 250, 1)',
    fontFamily: CustomFont.Urbanist500,
    lineHeight: 16.8,
    letterSpacing: 1.5,
  },
  thumbStyleOff: {
    backgroundColor: 'rgba(86, 86, 92, 1)',
  },
  thumbStyleOn: {
    backgroundColor: 'rgba(32, 201, 151, 1)',
  },
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

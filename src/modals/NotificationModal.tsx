import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
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
import {AppLoaderRef} from '../../App';
import {ErrorHandler} from '../utils/ErrorHandler';
import {CustomToaster} from '../utils/AlertNotification';
import {useMutation} from 'react-query';
import {MutationKeys} from '../utils/MutationKeys';
import moment from 'moment';
import {SetNotificationTime} from '../axious/PostApis';
import {ALERT_TYPE} from 'react-native-alert-notification';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateNotificationTime,
  updateProfile,
} from '../store/reducers/AuthReducer';
import { timerFormatter } from '../utils/currentDateIntlFormat';

interface AppearanceProps {
  isModalVisible: boolean;
  toggleModal: () => void;
}

const NotificationsModal: React.FC<AppearanceProps> = memo(
  ({isModalVisible, toggleModal}) => {
    const {notification_time} = useSelector((state: any) => state.auth);
    const [toggleStates, setToggleStates] = useState<boolean>(false);
    const [isPickerVisible, setPickerVisibility] = useState(false);
    const previousTimer = useRef<string | null>(null);
    const [timer, setTimer] = useState(() => {
      const date = new Date();
      date.setHours(10, 30, 0, 0);
      return date;
    });
    const dispatcher = useDispatch();

    useEffect(() => {
      if (notification_time) {
        const parsedTime = moment(notification_time, 'HH:mm').toDate(); // Convert to JavaScript Date
        setTimer(parsedTime);
        setToggleStates(true);
      }
    }, [notification_time]);

    const toggleSwitch = useCallback((): void => {
      setToggleStates(prevState => !prevState);
    }, []);



    const timerUTCFormatter = useCallback((time: Date) => {
      return moment.utc(time).format('HH:mm');
    }, []);

    const {mutate: setVerseTimer} = useMutation({
      mutationKey: MutationKeys.NotificationKey,
      mutationFn: async () =>
        await SetNotificationTime({
          time: timerUTCFormatter(timer),
          isNotification: toggleStates,
        }),
      onMutate: () => AppLoaderRef.current?.start(),
      onSuccess(data) {
        let localTime = timerFormatter(data?.data?.payload?.notification_time);
        if (data?.status == 200) {
          CustomToaster({
            type: ALERT_TYPE.SUCCESS,
            message: 'Notifications preference updated',
          });
          if (data?.data?.payload?.notification_time) {
            previousTimer.current = localTime;
            dispatcher(
              updateNotificationTime({
                notification_time: localTime,
              }),
            );
          }else{
            dispatcher(
              updateNotificationTime({
                notification_time: null,
              }),
            );
          }

          setTimeout(() => {
            toggleModal();
          }, 500);
        }
      },
      onError(error) {
        console.log(error);
        ErrorHandler(error);
      },
      onSettled: () => AppLoaderRef.current?.stop(),
    });

    const showPicker = useCallback(() => setPickerVisibility(true), []);
    const hidePicker = useCallback(() => setPickerVisibility(false), []);

    const handleConfirm = (date: Date) => {
      setTimer(date);
      hidePicker();
    };

    const handleSetTimer = useCallback(() => {
      let currentTimer = timerFormatter(timer);
      // if (previousTimer.current != currentTimer) {
      setVerseTimer(); // Call the API
      // } else {
      // toggleModal();
      // }
    }, [timer]);

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
                <Pressable
                  style={{backgroundColor: '#18171C', borderRadius: 15}}>
                  <View
                    style={{borderColor: '#1D1E23', borderBottomWidth: 1.5}}>
                    <Text style={styles.modalTitle}>Notifications</Text>
                  </View>

                  {/* First Toggle */}
                  <View style={styles.preference}>
                    <View>
                      <Text style={styles.text}>Verse only</Text>
                      <Pressable
                        style={({pressed}) => [
                          styles.timer,
                          pressed && {opacity: 0.5},
                        ]}
                        disabled={!toggleStates}
                        onPress={showPicker}>
                        <Image
                          source={CustomImages.timerIcon}
                          resizeMode="contain"
                          style={styles.timerIcon}
                        />
                        <Text style={styles.timerText}>
                          {moment(timer).format('HH:mm')}
                        </Text>
                      </Pressable>
                    </View>

                    <ToggleSwitch
                      isOn={toggleStates}
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
                        toggleStates ? (
                          <Image
                            source={CustomImages.rightIcon}
                            style={styles.toggleIcon}
                            resizeMode="contain"
                          />
                        ) : null
                      }
                      onToggle={toggleSwitch}
                    />
                  </View>
                  <CustomButton
                    text="Save preference"
                    onPress={handleSetTimer}
                    buttonStyle={{
                      marginHorizontal: 16,
                      marginVertical: 16,
                      marginBottom: Platform.select({ios: 40, android: 40}),
                    }}
                  />
                </Pressable>
              </View>
            </Pressable>
            <DatePicker
              modal
              open={isPickerVisible}
              date={timer}
              mode="time"
              minuteInterval={30} // Set 30-minute intervals
              onConfirm={handleConfirm}
              onCancel={hidePicker}
            />
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

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Pressable,
} from 'react-native';
import CustomFont from '../assets/customFonts';
import CustomImages from '../assets/customImages';
import ToggleSwitch from 'toggle-switch-react-native';
import CustomButton from '../common/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginSuccess,
  updateIsOldUser,
  updateNotificationTime,
} from '../store/reducers/AuthReducer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackParams} from '../navigation/MainStack';
import {ScreenProps} from '../navigation/Stack';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {useMutation} from 'react-query';
import {MutationKeys} from '../utils/MutationKeys';
import {SetNotificationTime} from '../axious/PostApis';
import {AppLoaderRef} from '../../App';
import {ErrorHandler} from '../utils/ErrorHandler';
import {CustomToaster} from '../utils/AlertNotification';
import {ALERT_TYPE} from 'react-native-alert-notification';

const NotificationPreferences: React.FC<
  ScreenProps<'NotificationPreferences'>
> = ({navigation}) => {
  const userData = useSelector((state: any) => state.auth);
  const [toggleStates, setToggleStates] = useState<boolean>(false);
  const [isPickerVisible, setPickerVisibility] = useState(false);
  const [timer, setTimer] = useState(() => {
    const date = new Date();
    date.setHours(10, 30, 0, 0);
    return date;
  });
  const previousTimer = useRef<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userData.notification_time) {
      const parsedTime = moment(userData.notification_time, 'HH:mm').toDate();
      setTimer(parsedTime);
      setToggleStates(true);
    }
  }, [userData.notification_time]);

  // Handler to update the state for a specific toggle
  const toggleSwitch = useCallback(() => {
    setToggleStates(prevState => !prevState);
  }, []);

  const handleSkip = useCallback(() => {
    dispatch(updateIsOldUser(true));
    navigation.navigate('BottomStack');
  }, []);

  const timerFormatter = useCallback((time: Date | string) => {
    return moment
      .utc(time, 'HH:mm:ss') // Parse as UTC time
      .local() // Convert to local time
      .format('HH:mm'); // Format in local time
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
          dispatch(
            updateNotificationTime({
              notification_time: localTime,
            }),
          );
        } else {
          dispatch(
            updateNotificationTime({
              notification_time: null,
            }),
          );
        }

        setTimeout(() => {
          handleSkip();
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
    if (previousTimer.current != currentTimer) {
      setVerseTimer(); // Call the API
    } else {
      handleSkip();
    }
  }, [timer]);

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Platform.select({
            ios: insets.bottom + 10,
            android: insets.bottom + 35,
          }),
        },
      ]}>
      <View style={styles.topContainer}>
        {/* First Toggle */}
        <View style={styles.preference}>
          <View>
            <Text style={styles.text}>Verse only</Text>
            <Pressable
              style={({pressed}) => [styles.timer, pressed && {opacity: 0.5}]}
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
            trackOffStyle={{borderColor: 'rgba(86, 86, 92, 1)', borderWidth: 1}}
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
      </View>
      <View style={{flexDirection: 'row', columnGap: 12}}>
        <CustomButton
          text="Skip"
          onPress={handleSkip}
          buttonStyle={{
            flex: 1,
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: 'rgba(56, 57, 62, 1)',
          }}
          textStyle={{color: 'rgba(250, 250, 250, 1)'}}
        />
        <CustomButton
          text="Save"
          onPress={handleSetTimer}
          buttonStyle={{flex: 1}}
        />
      </View>
      <DatePicker
        modal
        open={isPickerVisible}
        date={timer}
        mode="time"
        minuteInterval={30} // Set 30-minute intervals
        onConfirm={handleConfirm}
        onCancel={hidePicker}
      />
    </View>
  );
};

export default NotificationPreferences;

const styles = StyleSheet.create({
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
  topContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
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
    width: '100%',
    marginVertical: 10,
  },
  toggleIcon: {
    width: 6,
    height: 4,
  },
});

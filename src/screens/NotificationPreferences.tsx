import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import CustomFont from '../assets/customFonts';
import CustomImages from '../assets/customImages';
import ToggleSwitch from 'toggle-switch-react-native';
import CustomButton from '../common/CustomButton';
import {AuthStackProps} from '../navigation/AuthStack';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../store/reducers/AuthReducer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const NotificationPreferences: React.FC<
  AuthStackProps<'NotificationPreferences'>
> = ({navigation}) => {
  // State to track each switch independently
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    toggle1: false,
    toggle2: false,
    toggle3: false,
  });

  const dispatcher = useDispatch();

  // Handler to update the state for a specific toggle
  const toggleSwitch = (key: string): void => {
    setToggleStates(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handlePress = () => {
    dispatcher(loginSuccess('Login'));
  };

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
            trackOffStyle={{borderColor: 'rgba(86, 86, 92, 1)', borderWidth: 1}}
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
            trackOffStyle={{borderColor: 'rgba(86, 86, 92, 1)', borderWidth: 1}}
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
            trackOffStyle={{borderColor: 'rgba(86, 86, 92, 1)', borderWidth: 1}}
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
      </View>
      <View style={{flexDirection: 'row', columnGap: 12}}>
        <CustomButton
          text="Skip"
          onPress={handlePress}
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
          onPress={handlePress}
          buttonStyle={{flex: 1}}
        />
      </View>
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
    width: '90%',
    marginVertical: 10,
  },
  toggleIcon: {
    width: 6,
    height: 4,
  },
});

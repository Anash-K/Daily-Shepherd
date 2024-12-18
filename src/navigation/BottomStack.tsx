import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import VerseOfTheDay from '../screens/VerseOfTheDay';
import {ScreenProps} from './Stack';
import {Image, Platform, StyleSheet} from 'react-native';
import CustomImages from '../assets/customImages';
import Podcast from '../screens/Podcast';
import History from '../screens/History';
import Profile from '../screens/Profile';
import CustomFont from '../assets/customFonts';

export type BottomParams = {
  VerseOfTheDay: undefined;
  Podcast: undefined;
  History: undefined;
  Profile: undefined;
};

const BottomTab = createBottomTabNavigator<BottomParams>();

const BottomStack = () => {
  return (
    <BottomTab.Navigator
      screenOptions={() => ({
        tabBarStyle: {
          backgroundColor: 'rgba(24, 23, 28, 1)',
          height: Platform.select({android: 80, ios: 60}),
          borderColor: 'rgba(38, 37, 42, 1)',
        },
        tabBarLabel: () => null,
        tabBarIconStyle: styles.tabBarIconStyle,
        tabBarActiveTintColor: 'rgba(32, 201, 151, 1)',
        tabBarInactiveTintColor: 'rgba(250, 250, 250, 0.5)',
        sceneStyle: {backgroundColor: 'rgba(24, 23, 28, 1)'},
        headerStyle: styles.headerLook,
        headerTitleStyle: styles.title,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        tabBarHideOnKeyboard: true,
      })}>
      <BottomTab.Screen
        name="VerseOfTheDay"
        component={VerseOfTheDay}
        options={({}) => ({
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused ? CustomImages.activeHomeTab : CustomImages.homeTab
              }
              style={[
                {width: 24, height: 24},
                focused && {tintColor: 'rgba(32, 201, 151, 1)'},
              ]}
              tintColor={color}
              resizeMode="contain"
            />
          ),
        })}
      />

      <BottomTab.Screen
        name="Podcast"
        component={Podcast}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? CustomImages.activePodcastTab
                  : CustomImages.podcastTab
              }
              style={{width: 24, height: 24}}
              tintColor={color}
              resizeMode="contain"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? CustomImages.activeHistoryTab
                  : CustomImages.historyTab
              }
              style={{width: 24, height: 24}}
              tintColor={color}
              resizeMode="contain"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? CustomImages.activeProfileTab
                  : CustomImages.profileTab
              }
              style={{width: 24, height: 24}}
              tintColor={color}
              resizeMode="contain"
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomStack;

const styles = StyleSheet.create({
  tabBarIconStyle: {
    marginTop: 14,
  },
  headerLook: {
    backgroundColor: 'rgba(24, 23, 28, 1)', // Header background
  },
  title: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 24,
    lineHeight: 28.8,
    textAlign: 'center',
    color: 'rgba(250, 250, 250, 1)',
  },
});

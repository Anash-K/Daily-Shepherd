import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import VerseOfTheDay from '../screens/VerseOfTheDay';
import {ScreenProps} from './Stack';
import {Image} from 'react-native';
import CustomImages from '../assets/customImages';

export type BottomParams = {
  VerseOfTheDay: undefined;
};

const BottomTab = createBottomTabNavigator<BottomParams>();

const BottomStack = () => {
  return (
    <BottomTab.Navigator
      screenOptions={() => ({
        tabBarStyle: {
          backgroundColor: 'rgba(24, 23, 28, 1)',
        },
        tabBarLabel: () => null,
      })}>
      <BottomTab.Screen
        name="VerseOfTheDay"
        component={VerseOfTheDay}
        options={{
          tabBarIcon: () => (
            <Image
              source={CustomImages.homeTab}
              style={{width: 24, height: 24}}
              resizeMode="contain"
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomStack;

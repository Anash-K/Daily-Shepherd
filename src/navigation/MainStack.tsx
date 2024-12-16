import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CustomButton from '../common/CustomButton';
import CustomImages from '../assets/customImages';
import {Image, Platform, StyleSheet} from 'react-native';
import BottomStack from './BottomStack';
import Comments from '../screens/Comments';
import CustomFont from '../assets/customFonts';
import {TouchableOpacity} from 'react-native-gesture-handler';
import VerseDetails from '../common/VerseDetails';

export type StackParams = {
  BottomStack: undefined;
  Comments: undefined;
  VerseDetails: undefined;
};

const Stack = createNativeStackNavigator<StackParams>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerLeft: () => (
          <CustomButton
            onPress={() => navigation.goBack()}
            icon={CustomImages.backIcon}
            iconStyle={styles.backButtonIcon}
            buttonStyle={styles.backButton}
          />
        ),
        headerStyle: styles.headerLook,
        contentStyle: {backgroundColor: 'rgba(24, 23, 28, 1)'},
        headerTitleStyle: styles.title,
        headerTitleAlign: 'center',
      })}>
      <Stack.Screen
        name="BottomStack"
        component={BottomStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={({navigation}) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={CustomImages.crossIcon}
                style={styles.crossIconStyle}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="VerseDetails"
        component={VerseDetails}
        options={({navigation}) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={CustomImages.crossIcon}
                style={styles.crossIconStyle}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  crossIconStyle: {
    width: 24,
    height: 24,
  },

  backButtonIcon: {
    padding: 0,
    width: 15,
    height: 25,
    marginLeft: Platform.select({ios: 7, android: 10}),
  },
  headerLook: {
    backgroundColor: 'rgba(24, 23, 28, 1)', // Header background
    shadowColor: 'rgba(255, 0, 0, 1)', // Shadow color
    shadowOpacity: 0.5, // Shadow transparency
    shadowOffset: {width: 0, height: 2}, // Offset for the shadow
    shadowRadius: 4, // Spread of the shadow
    // height: Platform.select({android: 100}),
  },
  backButton: {backgroundColor: 'rgba(24, 23, 28, 1)', padding: 0, margin: 0},
  skipButtonText: {
    color: 'rgba(147, 150, 157, 1)',
  },
  title: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: 'rgba(250, 250, 250, 1)',
  },
});

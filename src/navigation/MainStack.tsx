import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ProfilePicture from '../screens/ProfilePicture';
import CustomButton from '../common/CustomButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomImages from '../assets/customImages';
import {Platform, StyleSheet} from 'react-native';
import BottomStack from './BottomStack';

export type StackParams = {
  BottomStack: undefined;
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
        headerShadowVisible: false,
        contentStyle: {backgroundColor: 'rgba(24, 23, 28, 1)'},
      })}>
      <Stack.Screen
        name="BottomStack"
        component={BottomStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  backButtonIcon: {
    padding: 0,
    width: 15,
    height: 25,
    marginLeft: Platform.select({ios: 7, android: 10}),
  },
  headerLook: {
    backgroundColor: 'rgba(24, 23, 28, 1)',
  },
  backButton: {backgroundColor: 'rgba(24, 23, 28, 1)', padding: 0, margin: 0},
  skipButtonText: {
    color: 'rgba(147, 150, 157, 1)',
  },
});

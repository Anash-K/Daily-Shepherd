import React, {useCallback} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';
import CustomButton from '../common/CustomButton';
import {AuthStackProps} from '../navigation/AuthStack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const InspiringPodcast: React.FC<AuthStackProps<'InspiringPodcast'>> = ({
  navigation,
}) => {
  const handlePress = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: Platform.select({
            ios: insets.bottom + 0,
            android: insets.bottom + 20,
          }),
        },
      ]}>
      <ScrollView
        style={styles.topContainer}
        showsVerticalScrollIndicator={false}>
        {/* <View > */}
        <Image
          source={CustomImages.introScreen2}
          style={styles.introScreen}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          Inspiring podcasts for faith and spiritual growth.
        </Text>
        {/* </View> */}
      </ScrollView>
      <View
        style={{
          paddingVertical: Platform.select({android: 20, ios: 10}),
          backgroundColor: 'rgba(24, 23, 28, 1)',
        }}>
        <CustomButton
          text="Continue"
          onPress={handlePress}
          buttonStyle={{}}
          icon={CustomImages.rightArrow}
          iconPosition="right"
          iconStyle={styles.rightIcon}
        />
      </View>
    </View>
  );
};

export default InspiringPodcast;

const styles = StyleSheet.create({
  rightIcon: {
    width: 22,
    height: 16,
    position: 'absolute',
    right: 16,
  },
  chainBox: {
    padding: 11,
    backgroundColor: 'rgba(32, 33, 38, 1)',
    position: 'absolute',
    top: 630 / 2,
    left: -25,
    borderWidth: 2,
    borderColor: 'rgba(24, 23, 28, 1)',
    borderRadius: 48,
  },
  chainIconStyle: {
    width: 27,
    height: 27,
  },
  topContainer: {
    flex: 1,
    position: 'relative',
    maxWidth: 300,
    marginHorizontal: 'auto',
    overflow: 'visible',
  },
  container: {
    flex: 1,
    // paddingBottom: Platform.select({android: 20}),
    paddingHorizontal: 16,
  },
  introScreen: {
    width: 300,
    height: 550,
    alignSelf: 'center',
  },
  title: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 28,
    lineHeight: 33.6,
    textAlign: 'center',
    color: 'rgba(250, 250, 250, 1)',
    marginTop: -30,
    maxWidth: 300,
    marginHorizontal: 'auto',
  },
});

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

const DailyInsPiration: React.FC<AuthStackProps<'DailyInsPiration'>> = ({
  navigation,
}) => {
  const handlePress = useCallback(() => {
    navigation.navigate('InspiringPodcast');
  }, [navigation]);

  const handleLogin = useCallback(() => {
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
            ios: insets.bottom + 10,
            android: insets.bottom + 40,
          }),
        },
      ]}>
      <ScrollView
        style={styles.topContainer}
        showsVerticalScrollIndicator={false}>
        <Image
          source={CustomImages.introScreen1}
          style={styles.introScreen}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          Daily inspiration with verses, teachings, and resources.
        </Text>
        <View style={styles.chainBox}>
          <Image
            source={CustomImages.chainIcon}
            style={styles.chainIconStyle}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 12,
          paddingTop: Platform.select({android: 20}),
          paddingHorizontal: 16,
        }}>
        <CustomButton
          text="Skip"
          onPress={handleLogin}
          buttonStyle={{
            flex: 1,
            backgroundColor: 'rgba(24, 23, 28, 1)',
            borderWidth: 1,
            borderColor: 'rgba(56, 57, 62, 1)',
          }}
          textStyle={{color: 'rgba(250, 250, 250, 1)'}}
        />
        <CustomButton
          text="Next"
          onPress={handlePress}
          buttonStyle={{flex: 1}}
        />
      </View>
    </View>
  );
};

export default DailyInsPiration;

const styles = StyleSheet.create({
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
    paddingBottom: Platform.select({android: 20}),
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

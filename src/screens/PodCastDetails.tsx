import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../common/CustomButton';
import {ScreenProps} from '../navigation/Stack';
import CustomImages from '../assets/customImages';
import {Data} from './Podcast';
import CustomFont from '../assets/customFonts';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const PodCastDetails: React.FC<ScreenProps<'PodCastDetails'>> = ({
  navigation,
  route,
}) => {
  const {DataId} = route.params;

  const PodCastData = Data.find((item: any) => item.id === DataId);

  const handlePress = () => {};

  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[
        styles.container,
        {
          marginTop: Platform.select({ios: insets.top}),
          marginBottom: Platform.select({ios: insets.bottom}),
        },
      ]}
      contentContainerStyle={{paddingBottom: 30}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.topHeader}>
        <CustomButton
          onPress={() => navigation.goBack()}
          icon={CustomImages.backIcon}
          iconStyle={styles.backButtonIcon}
          buttonStyle={styles.backButton}
        />
        <Image source={PodCastData?.imageSrc} style={styles.picStyle} />
      </View>
      <Text style={styles.PodcastPenName}>{PodCastData?.name}</Text>
      <Text style={styles.podcastName}>Faith Over Fear</Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          text="Play"
          onPress={handlePress}
          icon={CustomImages.playIcon}
          iconStyle={{width: 12, height: 16}}
          buttonStyle={{
            paddingHorizontal: 32,
            paddingVertical: 9,
            columnGap: 6,
          }}
        />
      </View>
      <View style={styles.TabBox}>
        <Text style={styles.TabText}>Description</Text>
      </View>
      <View style={{rowGap: 1}}>
        <Text style={[styles.textColor]}>
          Life is too short and God has too much for us to do for any of us to
          live enslaved. Jesus promised His followers would experience filled to
          overflowing life, a life characterized by joy, peace, and spiritual
          and emotional vitality. And yet, we daily make decisions based on
          fear, not faith. In Faith Over Fear, author and speaker Jennifer
          Slattery helps us see different areas of life where fear has a
          foothold, and how our identity as children of God can help us move
          from fear to faithful, bold living.
        </Text>
        <Text style={[styles.textColor, {marginVertical: 16}]}>
          This podcast covers topics like:
        </Text>
        <Text style={[styles.textColor]}>⭐️ How to Overcome Fear</Text>
        <Text style={[styles.textColor]}>
          ⭐️ Biblical Strategies for Overcoming Fear and Anxiety
        </Text>
        <Text style={[styles.textColor]}>
          ⭐️ Powerful Steps to Fight Anxiety
        </Text>
        <Text style={[styles.textColor]}>
          ⭐️ Finding God Faithful in Hard Seasons
        </Text>
        <Text style={[styles.textColor]}>
          ⭐️ Courage to Wait on God Jesus has more planned for us than we could
          imagine and He’s fully committed to perfecting that which concerns us.{' '}
        </Text>
        <Text style={[styles.textColor]}>
          ⭐️ Fear holds us back, but His perfect love has the power to cast out
          all fear!
        </Text>
      </View>
    </ScrollView>
  );
};

export default PodCastDetails;

const styles = StyleSheet.create({
  TabBox: {
    borderBottomColor: 'rgba(32, 201, 151, 1)',
    paddingBottom: 8,
    borderBottomWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: 16,
    marginTop: 24,
  },
  TabText: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 14,
    lineHeight: 16.8,
    color: 'rgba(32, 201, 151, 1)',
  },
  buttonContainer: {
    borderBottomColor: 'rgba(250, 250, 250, 0.05)',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    paddingBottom: 16,
  },
  textColor: {
    color: 'rgba(250, 250, 250, 1)',
    fontSize: 16,
    lineHeight: 19.2,
    fontFamily: CustomFont.Urbanist400,
  },
  PodcastPenName: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 16,
    color: 'rgba(32, 201, 151, 1)',
    lineHeight: 19.2,
    textAlign: 'center',
    marginBottom: 8,
  },
  container: {
    padding: 16,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 16,
  },
  backButtonIcon: {
    padding: 0,
    width: 15,
    height: 25,
    marginLeft: Platform.select({ios: 7, android: 10}),
  },
  backButton: {
    backgroundColor: 'rgba(24, 23, 28, 1)',
    padding: 0,
    margin: 0,
    position: 'absolute',
    left: 0,
  },
  picStyle: {
    width: 150,
    height: 150,
  },
  podcastName: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 20,
    color: 'rgba(250, 250, 250, 1)',
    marginTop: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
});

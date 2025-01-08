import React from 'react';
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../common/CustomButton';
import {ScreenProps} from '../navigation/Stack';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import NoDataFound from '../utils/NoDataFound';
import CustomImageHandler from '../utils/CustomImageHandler';

const PodCastDetails: React.FC<ScreenProps<'PodCastDetails'>> = ({
  navigation,
  route,
}) => {
  const {Data} = route.params;

  const handlePress = (link: string) => {
    Linking.openURL(link);
  };

  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      bounces={false}
      // overScrollMode="never"
      style={[
        styles.container,
        {
          marginTop: Platform.select({ios: insets.top}),
          marginBottom: Platform.select({ios: insets.bottom}),
        },
      ]}
      contentContainerStyle={{paddingBottom: 30, flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      {Data.host ? (
        <>
          <View style={styles.topHeader}>
            <CustomButton
              onPress={() => navigation.goBack()}
              icon={CustomImages.backIcon}
              iconStyle={styles.backButtonIcon}
              buttonStyle={styles.backButton}
            />
            <CustomImageHandler
              sourceImage={Data.thumbnail}
              placeholderImage={CustomImages.podcastPlaceHolder}
              imageStyle={styles.picStyle}
            />
          </View>
          <Text style={styles.PodcastPenName}>{Data?.title}</Text>
          <Text style={styles.podcastName}>{Data?.host}</Text>
          <View style={styles.buttonContainer}>
            <CustomButton
              text="Play"
              onPress={handlePress.bind(this, Data.link)}
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
          <View style={{rowGap: 1,}}>
            <Text style={[styles.textColor]}>{Data.description}</Text>
          </View>
        </>
      ) : (
        <>
          <CustomButton
            onPress={() => navigation.goBack()}
            icon={CustomImages.backIcon}
            iconStyle={styles.backButtonIcon}
            buttonStyle={styles.backButton}
          />
          <NoDataFound />
        </>
      )}
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
    marginBottom:10,
    flex: 1,
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
    borderRadius: 12,
    borderWidth: 0.46,
    borderColor: 'rgba(255, 255, 255, 0.15)',
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

import React, {useCallback, useLayoutEffect} from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScreenProps} from '../navigation/Stack';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';
import {getPartOfDay} from '../utils/getPartOfDay';
import VerseBox from '../common/VerseBox';
import {Data} from '../utils/verseBoxDemoData';
import {verseReflectionData} from '../utils/verReflectionDemoData';
import VerseReflectionBox from '../common/VerseReflectionBox';
import {ContextChapterData} from '../utils/contextChapterDemoData';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const VerseDetails: React.FC<ScreenProps<'VerseDetails'>> = ({
  route,
  navigation,
}) => {
  const currentDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const {greeting, image} = getPartOfDay();

  let todaysVerse = Data.filter((chunk: any, index) => index == 0);

  let todaysReflection = verseReflectionData
    .filter((chunk: any, index) => index == 0)
    .map(item => ({
      ...item,
      title: "Today's Reflection",
    }));

  let todaysContext = ContextChapterData.filter(
    (chunk: any, index) => index == 0,
  ).map(item => ({
    ...item,
    title: 'Context Chapter',
  }));

  const {verseId} = route.params;

  const verseData = Data.filter((item: any) => item.id === verseId);

  useLayoutEffect(() => {
    if (verseData) {
      navigation.setOptions({
        title: 'Jan 2, 2025',
      });
    }
  }, [verseData, navigation]);

  const handleDetails = () => {};

  const insets = useSafeAreaInsets();

  const handleLink = useCallback((link: any) => {
    Linking.openURL(link);
  }, []);
  return (
    <ScrollView style={[styles.container, {marginBottom: insets.bottom}]}>
      {todaysVerse?.map((item: any) => (
        <React.Fragment key={item.id}>
          {/* Verse Box */}
          <VerseBox
            id={item.id}
            date={item.date}
            liked={item.is_favorite}
            commentNumber={item.comment_count}
            reference={item.verse_reference}
            verse={item.verse}
            OnPressDetails={handleDetails}
          />

          {/* Reflection Boxes */}
          <VerseReflectionBox
            title={"Today's Reflection"}
            content={item.verse_reference}
            OnPressLink={handleLink.bind(null, item.reflection_link)}
          />
          <VerseReflectionBox
            title={'Context Chapter'}
            content={item.context_chapter}
            OnPressLink={handleLink.bind(null, item.context_chapter_link)}
          />
        </React.Fragment>
      ))}

      {/* Video Section */}
      <View style={styles.videoBox}>
        <Text style={styles.videoHeading}>Watch Video</Text>
        <Image
          source={CustomImages.videoImage}
          style={styles.videoStyle}
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );
};
export default VerseDetails;

const styles = StyleSheet.create({
  videoBox: {
    backgroundColor: 'rgba(32, 33, 38, 1)',
    borderRadius: 15,
    padding: 16,
    paddingBottom: Platform.select({android: 10, ios: 16}),
    // marginTop: 16,
    marginBottom: 40,
  },
  videoHeading: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 16,
    lineHeight: 19.2,
    color: 'rgba(250, 250, 250, 0.75)',
    marginBottom: Platform.select({android: 5, ios: 12}),
  },
  videoStyle: {
    width: '100%',
    height: 200,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 50,
  },
  rightBox: {},
  leftBox: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  name: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 16,
    lineHeight: 19.2,
    color: 'rgba(250, 250, 250, 1)',
  },
  dayTimeText: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 14,
    lineHeight: 16.8,
    color: 'rgba(250, 250, 250, 1)',
    marginBottom: 2,
  },
  dateText: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 18,
    lineHeight: 21.6,
    color: 'rgba(250, 250, 250, 1)',
    marginBottom: -7,
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  weatherImageStyle: {
    width: 38,
    height: 38,
  },
  text: {
    color: 'rgba(250, 250, 250, 1)',
  },
});

import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
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
import VerseBox from '../common/VerseBox';
import VerseReflectionBox from '../common/VerseReflectionBox';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMutation} from 'react-query';
import {GetScriptureDetails} from '../axious/getApis';
import {AppLoaderRef} from '../../App';
import {ErrorHandler} from '../utils/ErrorHandler';
import {MutationKeys} from '../utils/MutationKeys';
import {VerseState} from '../types/CommonTypes';
import NoDataFound from '../utils/NoDataFound';
import {formatDate} from '../utils/currentDateIntlFormat';

const VerseDetails: React.FC<ScreenProps<'VerseDetails'>> = ({
  route,
  navigation,
}) => {
  const initialVerseState: VerseState = {
    comment_count: 0,
    context_chapter: '',
    context_chapter_link: '',
    date: '',
    id: '',
    is_favorite: false,
    reflection: '',
    reflection_link: '',
    verse: '',
    verse_reference: '',
    video_link: '',
  };

  const {verseId} = route.params;
  const [verseData, setVerseData] = useState<VerseState>(initialVerseState);
  const [ScreenText, setScreenText] = useState('please wait...');
  // const verseData = Data.filter((verseData: any) => verseData.id === verseId);

  useLayoutEffect(() => {
    if (verseData.date) {
      const dateObj = new Date(verseData.date);
      // Format the date
      const dateTitle = formatDate(dateObj);
      if (verseData) {
        navigation.setOptions({
          title: dateTitle,
        });
      }
    }
  }, [verseData, navigation]);

  const {mutate: GetScriptureData} = useMutation({
    mutationKey: MutationKeys.VerseDetailsKey,
    mutationFn: async () => await GetScriptureDetails({id: verseId}),
    onMutate: () => AppLoaderRef.current?.start(),
    onSuccess(data) {
      if (data?.payload?.verse) {
        setVerseData(data?.payload);
      } else {
        setScreenText('No Details Available...');
      }
    },
    onError(error) {
      console.log(error);
      setScreenText('No Details Available...');
      ErrorHandler(error);
    },
    onSettled: () => AppLoaderRef.current?.stop(),
  });

  useEffect(() => {
    if (verseData) {
      GetScriptureData();
    }
  }, [verseId]);

  const handleDetails = () => {};

  const insets = useSafeAreaInsets();

  const handleLink = useCallback((link: any) => {
    Linking.openURL(link);
  }, []);

  return (
    <ScrollView
      style={[styles.container, {marginBottom: insets.bottom}]}
      contentContainerStyle={styles.contentStyle}>
      {verseData.verse ? (
        <View style={styles.innerContainer}>
          {/* Verse Box */}
          <VerseBox
            id={verseData.id}
            date={verseData.date}
            liked={verseData.is_favorite}
            commentNumber={verseData.comment_count}
            reference={verseData.verse_reference}
            verse={verseData.verse}
            OnPressDetails={handleDetails}
          />

          {/* Reflection Boxes */}
          <VerseReflectionBox
            title={"Today's Reflection"}
            content={verseData.reflection}
            OnPressLink={handleLink.bind(null, verseData.reflection_link)}
          />
          <VerseReflectionBox
            title={'Context Chapter'}
            content={verseData.context_chapter}
            OnPressLink={handleLink.bind(null, verseData.context_chapter_link)}
          />
          {/* Video Section */}
          <View style={styles.videoBox}>
            <Text style={styles.videoHeading}>Watch Video</Text>
            <Image
              source={CustomImages.videoImage}
              style={styles.videoStyle}
              resizeMode="contain"
            />
          </View>
        </View>
      ) : (
        <NoDataFound title={ScreenText} />
      )}
    </ScrollView>
  );
};
export default VerseDetails;

const styles = StyleSheet.create({
  contentStyle: {flexGrow: 1},
  innerContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  videoBox: {
    backgroundColor: 'rgba(32, 33, 38, 1)',
    borderRadius: 15,
    padding: 16,
    paddingBottom: Platform.select({android: 10, ios: 16}),
    // marginTop: 16,
    marginBottom: 40,
    width: '100%',
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

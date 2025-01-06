import React, {useCallback, useEffect, useState} from 'react';
import {
  DeviceEventEmitter,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScreenProps} from '../navigation/Stack';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';
import {getPartOfDay} from '../utils/getPartOfDay';
import VerseBox from '../common/VerseBox';
import VerseReflectionBox from '../common/VerseReflectionBox';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppLoaderRef} from '../../App';
import {ErrorHandler} from '../utils/ErrorHandler';
import {GetScriptureOfTheDay} from '../axious/getApis';
import {useMutation} from 'react-query';
import {MutationKeys} from '../utils/MutationKeys';
import NoDataFound from '../utils/NoDataFound';

const VerseOfTheDay: React.FC<ScreenProps<'VerseOfTheDay'>> = () => {
  const initialVerseState = {
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

  const [verseData, setVerseData] = useState(initialVerseState);
  const currentDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const {greeting, image} = getPartOfDay();
  const [ScreenText, setScreenText] = useState('please wait...');

  const handlePress = () => {};

  const insets = useSafeAreaInsets();

  const commonErrorHandler = useCallback((error: any) => {
    console.error(error);
    setScreenText('No Data Found');
    ErrorHandler(error);
  }, []);

  const handleData = (data: any) => {
    if (data.id) {
      setVerseData(prevState => ({
        ...prevState,
        comment_count: data?.comment_count ?? prevState.comment_count,
        context_chapter: data?.context_chapter ?? prevState.context_chapter,
        context_chapter_link:
          data?.context_chapter_link ?? prevState.context_chapter_link,
        date: data?.date ?? prevState.date,
        id: data?.id ?? prevState.id,
        is_favorite: data?.is_favorite ?? prevState.is_favorite,
        reflection: data?.reflection ?? prevState.reflection,
        reflection_link: data?.reflection_link ?? prevState.reflection_link,
        verse: data?.verse ?? prevState.verse,
        verse_reference: data?.verse_reference ?? prevState.verse_reference,
        video_link: data?.video_link ?? prevState.video_link,
      }));
    } else {
      setScreenText('No Data Found');
    }
  };

  const {mutate: todaysVerseMutate} = useMutation({
    mutationKey: MutationKeys.todaysVerseMutationKey,
    mutationFn: async () => await GetScriptureOfTheDay(),
    onMutate: () => AppLoaderRef.current?.start(),
    onError: error => {
      commonErrorHandler(error);
    },
    onSuccess(data) {
      handleData(data?.data?.payload);
    },
    onSettled: () => AppLoaderRef.current?.stop(),
  });

  useEffect(() => {
    todaysVerseMutate();
  }, []);

  const handleLink = useCallback((link: any) => {
    Linking.openURL(link);
  }, []);

  useEffect(() => {
    const verseEvent = DeviceEventEmitter.addListener('trackLike', data => {
      console.log(data,verseData.id)
      console.log('verse off the day')
      if (data.id == verseData.id) {
        todaysVerseMutate();
      }
    });
    return () => {
      verseEvent.remove();
    };
  }, []);

  return (
    <ScrollView
      style={[styles.container, {marginTop: insets.top}]}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.headContainer}>
        <View style={styles.leftBox}>
          <Image
            source={image}
            style={styles.weatherImageStyle}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.dayTimeText}>{greeting}</Text>
            <Text style={styles.name}>Christopher</Text>
          </View>
        </View>

        <View style={styles.rightBox}>
          <View
            style={{
              borderBottomColor: 'rgba(32, 201, 151, 0.25)',
              borderBottomWidth: 8,
            }}>
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>
        </View>
      </View>

      {verseData.id ? (
        <>
          <VerseBox
            id={verseData.id}
            date={'Verse of the day'}
            liked={verseData.is_favorite}
            commentNumber={verseData.comment_count}
            reference={verseData.verse_reference}
            verse={verseData.verse}
            OnPressDetails={handlePress}
          />

          <VerseReflectionBox
            title={'Todays Reflection'}
            content={verseData.reflection}
            OnPressLink={handleLink.bind(null, verseData.reflection_link)}
          />
          <VerseReflectionBox
            title={'Context Chapter'}
            content={verseData.context_chapter}
            OnPressLink={handleLink.bind(null, verseData.context_chapter_link)}
          />
          <View style={styles.videoBox}>
            <Text style={styles.videoHeading}>Watch Video</Text>
            <TouchableOpacity
              onPress={handleLink.bind(null, verseData.video_link)}
              style={{borderRadius: 15.4}}>
              <Image
                source={CustomImages.videoImage}
                style={styles.videoStyle}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <NoDataFound title={ScreenText} />
      )}
    </ScrollView>
  );
};

export default VerseOfTheDay;

const styles = StyleSheet.create({
  noDataText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  videoBox: {
    backgroundColor: 'rgba(32, 33, 38, 1)',
    borderRadius: 15,
    padding: 16,
    paddingBottom: 16,
    marginBottom: 40,
  },
  videoHeading: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 16,
    lineHeight: 19.2,
    color: 'rgba(250, 250, 250, 0.75)',
    marginBottom: 12,
  },
  videoStyle: {
    width: '100%',
    height: 200,
    borderRadius: 15.4,
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

import {
  DeviceEventEmitter,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import VerseBox from '../common/VerseBox';
import CustomFont from '../assets/customFonts';
import React, {useEffect, useState} from 'react';
import {ScreenProps} from '../navigation/Stack';
import {useMutation} from 'react-query';
import {MutationKeys} from '../utils/MutationKeys';
import {AppLoaderRef} from '../../App';
import {ErrorHandler} from '../utils/ErrorHandler';
import {GetFavoriteScripture} from '../axious/getApis';
import {VerseBoxDetailsType} from '../types/CommonTypes';
import NoDataFound from '../utils/NoDataFound';

const Favorites: React.FC<ScreenProps<'Favorites'>> = ({navigation}) => {
  const handleDetails = (id: any) => {
    navigation.navigate('VerseDetails', {
      verseId: id, // Pass only the verse ID
    });
  };
  const [ScreenText, setScreenText] = useState('please wait...');
  const [verseData, setVerseData] = useState<VerseBoxDetailsType[]>([]);

  const {mutate: getFavoriteVerse} = useMutation({
    mutationKey: MutationKeys.FavoriteVerseMutationKey,
    onMutate: () => AppLoaderRef.current?.start(),
    mutationFn: async () => await GetFavoriteScripture(),
    onSuccess(data) {
      console.log(data?.payload?.data, 'favorite data');
      if (data?.payload?.data[0]?.date) {
        setVerseData(data?.payload?.data);
      } else {
        setScreenText('No Data Found');
      }
    },
    onError(error) {
      console.log(error, 'error');
      setScreenText('No Data Found');
      ErrorHandler(error);
    },
    onSettled: () => AppLoaderRef.current?.stop(),
  });

  useEffect(() => {
    getFavoriteVerse();
  }, []);

  useEffect(() => {
    const verseEvent = DeviceEventEmitter.addListener('trackLike', data => {
      getFavoriteVerse();
    });
    return () => {
      verseEvent.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {verseData.length > 0 ? (
        <FlatList
          data={verseData}
          renderItem={({item}) => (
            <VerseBox
              liked={item.is_favorite}
              id={item.id}
              date={item.date}
              reference={item.verse_reference}
              verse={item.verse}
              commentNumber={item.comment_count}
              OnPressDetails={handleDetails.bind(null, item.date)}
            />
          )}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <NoDataFound title={ScreenText} />
      )}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  searchInput: {
    fontSize: 18,
    fontFamily: CustomFont.Urbanist400,
    lineHeight: 21.6,
    color: 'rgba(250, 250, 250, 1)',
    flex: 1,
  },
  container: {
    padding: 16,
    flex: 1,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(56, 57, 62, 1)',
    borderRadius: 48,
    paddingLeft: 12,
    paddingVertical: Platform.select({ios: 12, android: 0}),
    paddingRight: 28,
    borderWidth: 1,
    columnGap: 8,
    marginBottom: 28,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
});

import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Data} from '../utils/verseBoxDemoData';
import VerseBox from '../common/VerseBox';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';
import React, {useCallback, useEffect} from 'react';
import {ScreenProps} from '../navigation/Stack';
import {useMutation} from 'react-query';
import {MutationKeys} from '../utils/MutationKeys';
import {AppLoaderRef} from '../../App';
import {ErrorHandler} from '../utils/ErrorHandler';
import {GetHistory} from '../axious/getApis';
import {CustomToaster} from '../utils/AlertNotification';
import {HistoryItem} from '../types/CommonTypes';

const History: React.FC<ScreenProps<'History'>> = ({navigation}) => {
  const [search, setSearch] = React.useState<string>('');
  const [history, setHistory] = React.useState<HistoryItem[]>([]);
  const handleDetails = (id: any) => {
    navigation.navigate('VerseDetails', {
      verseId: id, // Pass only the verse ID
    });
  };

  const {mutate: getHistoryData} = useMutation({
    mutationKey: MutationKeys.historyMutationKey,
    onMutate: () => AppLoaderRef.current?.start(),
    mutationFn: async () => await GetHistory(search),
    onSuccess(data) {
      console.log(data?.data?.payload?.data)
      setHistory(data?.data?.payload?.data);
    },
    onError(error) {
      console.log(error);
      ErrorHandler(error);
    },
    onSettled: () => AppLoaderRef.current?.stop(),
  });

  useEffect(() => {
    getHistoryData();
  }, [search]);

  const handleSearch = useCallback((val: string) => {
    setSearch(val);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Image
          source={CustomImages.searchIcon}
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          placeholder="Search by topic, scripture, or keyword…"
          placeholderTextColor={'rgba(250, 250, 250, 0.5)'}
          style={styles.searchInput}
          value={search}
          onChangeText={handleSearch}
        />
      </View>
      {history.length > 0 ? (
        <FlatList
          data={history}
          renderItem={({item}) => (
            <VerseBox
              liked={item.is_favorite}
              id={item.id}
              date={item.date}
              reference={item.verse_reference}
              verse={item.verse}
              commentNumber={item.comment_count}
              OnPressDetails={handleDetails.bind(null, item.id)}
            />
          )}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode='never'
        />
      ) : (
        <View
          style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.noHistory}>No history found</Text>
        </View>
      )}
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  noHistory: {
    color: '#20C997',
    textAlign: 'center',
    fontSize: 16,
  },
  searchInput: {
    fontSize: 18,
    fontFamily: CustomFont.Urbanist400,
    lineHeight: 21.6,
    color: 'rgba(250, 250, 250, 1)',
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 0,
    paddingTop: 0,
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

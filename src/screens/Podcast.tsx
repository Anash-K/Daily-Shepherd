import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';
import React, {useCallback, useEffect, useState} from 'react';
import {ScreenProps} from '../navigation/Stack';
import {useMutation} from 'react-query';
import {AppLoaderRef} from '../../App';
import {GetPodcast} from '../axious/getApis';
import {ErrorHandler} from '../utils/ErrorHandler';
import {PodcastState} from '../types/CommonTypes';
import NoDataFound from '../utils/NoDataFound';
import CustomImageHandler from '../utils/CustomImageHandler';
import {MutationKeys} from '../utils/MutationKeys';

const Podcast: React.FC<ScreenProps<'Podcast'>> = ({navigation}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [onFirstLoad, setOnFirstLoad] = useState<boolean>(true);
  const [podcastData, setPodcastData] = useState<PodcastState[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [debounceQuery, setDebounceQuery] = useState<string>('');

  const handleDetails = useCallback((DataChunk: PodcastState) => {
    navigation.navigate('PodCastDetails', {
      Data: DataChunk,
    });
  }, []);

  const {mutate: getPodcastData} = useMutation({
    mutationKey: MutationKeys.PodcastKey,
    onMutate: () => {
      AppLoaderRef.current?.start();
      setIsLoading(true);
    },
    mutationFn: async () => await GetPodcast(searchKeyword),
    onSuccess(data) {
      setPodcastData(data?.data);
    },
    onError(error) {
      console.log(error, 'Error');
      ErrorHandler(error);
    },
    onSettled: () => {
      AppLoaderRef.current?.stop();
      setIsLoading(false);
      setOnFirstLoad(false);
    },
  });

  //debouncer to optimize search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceQuery(searchKeyword);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchKeyword]);

  useEffect(() => {
    getPodcastData();
  }, [debounceQuery]);

  const handleChange = useCallback((val: string) => {
    setSearchKeyword(val);
  }, []);

  const renderPodcastItem = ({item}: {item: PodcastState}) => (
    <TouchableOpacity
      style={styles.podcastItem}
      onPress={handleDetails.bind(this, item)}>
      <CustomImageHandler
        sourceImage={item.thumbnail}
        placeholderImage={CustomImages.podcastPlaceHolder}
        imageStyle={styles.podcastImage}
      />
      <Text style={styles.podcastName}>{item.title}</Text>
      <Text style={styles.podcastDetails}>{item.host}</Text>
    </TouchableOpacity>
  );

  if (isLoading && onFirstLoad) {
    return null;
  }

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
          onChangeText={handleChange}
        />
      </View>
      {podcastData?.length > 0 ? (
        <>
          <FlatList
            data={podcastData}
            renderItem={renderPodcastItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={{
              justifyContent: 'space-between',
            }}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <NoDataFound />
      )}
    </View>
  );
};

export default Podcast;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 0,
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
  searchInput: {
    fontSize: 18,
    fontFamily: CustomFont.Urbanist400,
    lineHeight: 21.6,
    color: 'rgba(250, 250, 250, 1)',
    flex: 1,
  },
  podcastItem: {
    borderRadius: 20,
    width: '48%',
  },
  podcastImage: {
    width: '100%',
    height: 170,
    borderRadius: 12,
    // aspectRatio: 1,
  },
  podcastName: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 12,
    color: 'rgba(32, 201, 151, 1)',
    marginBottom: 4,
    marginTop: 8,
    lineHeight: 14.4,
  },
  podcastDetails: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 14,
    lineHeight: 16.8,
    color: 'rgba(250, 250, 250, 1)',
  },
});

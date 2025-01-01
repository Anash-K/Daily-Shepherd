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
import ScreenWrapper from '../common/ScreenWrapper';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';
import React from 'react';
import {ScreenProps} from '../navigation/Stack';

export const Data = [
  {
    id: 1,
    imageSrc: CustomImages.podcast1,
    name: 'Ascension Catholic Media',
    details: 'The Bible in a Year (with Fr. Mike Schmitz)',
  },
  {
    id: 2,
    imageSrc: CustomImages.podcast2,
    name: 'LifeAudio',
    details: 'How to Study the Bible - Bible Study Made Simple',
  },
  {
    id: 3,
    imageSrc: CustomImages.podcast3,
    name: 'Dr. Melody Stevens',
    details: 'The Bible In A Year Podcast with Dr. Melody...',
  },
  {
    id: 4,
    imageSrc: CustomImages.podcast4,
    name: 'LifeAudio',
    details: 'Faith Over Fear',
  },
  {
    id: 5,
    imageSrc: CustomImages.podcast5,
    name: 'Podcast 5',
    details: 'Details for Podcast 5',
  },
  {
    id: 6,
    imageSrc: CustomImages.podcast6,
    name: 'Podcast 6',
    details: 'Details for Podcast 6',
  },
  {
    id: 7,
    imageSrc: CustomImages.podcast7,
    name: 'Podcast 7',
    details: 'Details for Podcast 7',
  },
];

const Podcast: React.FC<ScreenProps<'Podcast'>> = ({navigation}) => {
  const handleDetails = (id: any) => {
    
    navigation.navigate('PodCastDetails',{
      DataId:id
    });
  };

  const renderPodcastItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.podcastItem}
      onPress={handleDetails.bind(this, item.id)}>
      <Image source={item.imageSrc} style={styles.podcastImage} />
      <Text style={styles.podcastName}>{item.name}</Text>
      <Text style={styles.podcastDetails}>{item.details}</Text>
    </TouchableOpacity>
  );

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
        />
      </View>
      <FlatList
        data={Data}
        renderItem={renderPodcastItem}
        keyExtractor={(item, index) => `podcast-${index}`}
        numColumns={2}
        contentContainerStyle={{
          justifyContent: 'space-between',
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between', // Adds space between columns
          marginBottom: 16, // Optional: adds space between rows
        }}
      />
    </View>
  );
};

export default Podcast;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 30,
    marginBottom: 60,
    paddingTop:0
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

import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ScreenWrapper from '../common/ScreenWrapper';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';
import React from 'react';
import {ScreenProps} from '../navigation/Stack';

const Data = [
  {
    imageSrc: CustomImages.podcast1,
    name: 'Ascension Catholic Media',
    details: 'The Bible in a Year (with Fr. Mike Schmitz)',
  },
  {
    imageSrc: CustomImages.podcast2,
    name: 'LifeAudio',
    details: 'How to Study the Bible - Bible Study Made Simple',
  },
  {
    imageSrc: CustomImages.podcast3,
    name: 'Dr. Melody Stevens',
    details: 'The Bible In A Year Podcast with Dr. Melody...',
  },
  {
    imageSrc: CustomImages.podcast4,
    name: 'LifeAudio',
    details: 'Faith Over Fear',
  },
  {
    imageSrc: CustomImages.podcast5,
    name: 'Podcast 5',
    details: 'Details for Podcast 5',
  },
  {
    imageSrc: CustomImages.podcast6,
    name: 'Podcast 6',
    details: 'Details for Podcast 6',
  },
  {
    imageSrc: CustomImages.podcast7,
    name: 'Podcast 7',
    details: 'Details for Podcast 7',
  },
];

const Podcast: React.FC<ScreenProps<'Podcast'>> = () => {
  const renderPodcastItem = ({item}: any) => (
    <View style={styles.podcastItem}>
      <Image source={item.imageSrc} style={styles.podcastImage} />
      <Text style={styles.podcastName}>{item.name}</Text>
      <Text style={styles.podcastDetails}>{item.details}</Text>
    </View>
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
        contentContainerStyle={{justifyContent: 'space-between'}}
      />
    </View>
  );
};

export default Podcast;

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    // paddingBottom: 30,
    // marginBottom: 60,
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
    marginBottom: 20,
    width: '48%',
    // aspectRatio: 0.8,
    marginHorizontal: 5,
    backgroundColor: 'red',
  },
  podcastImage: {
    width: 163,
    height: 170,
    borderRadius: 12,
    aspectRatio: 1.2,
  },
  podcastName: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
    marginVertical: 8,
  },
  podcastDetails: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

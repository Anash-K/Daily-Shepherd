import React from 'react';
import {
  FlatList,
  Image,
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

const VerseOfTheDay: React.FC<ScreenProps<'VerseOfTheDay'>> = () => {
  const currentDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const {greeting, image} = getPartOfDay();

  let todaysVerse = Data.filter((chunk: any) => chunk.title == currentDate);

  let todaysReflection = verseReflectionData.filter(
    chuckItem => chuckItem.date == currentDate,
  );
  let todaysContext = verseReflectionData.filter(
    chuckItem => chuckItem.date == currentDate,
  );

  return (
    <ScrollView style={styles.container}>
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

      {/* FlatList Rendering */}
      <FlatList
        data={todaysVerse}
        renderItem={({item}) => <VerseBox {...item} />}
        keyExtractor={item => item.title}
        showsVerticalScrollIndicator={false}
      />
      <FlatList
        data={todaysReflection}
        keyExtractor={item => item.title}
        renderItem={({item}) => <VerseReflectionBox {...item} />}
        showsVerticalScrollIndicator={false}
      />
      <FlatList
        data={todaysContext}
        keyExtractor={item => item.title}
        renderItem={({item}) => <VerseReflectionBox {...item} />}
        showsVerticalScrollIndicator={false}
      />
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

export default VerseOfTheDay;

const styles = StyleSheet.create({
  videoBox: {
    backgroundColor: 'rgba(32, 33, 38, 1)',
    borderRadius: 15,
    padding: 16,
    marginTop: 16,
  },
  videoHeading: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 16,
    lineHeight: 19.2,
    color: 'rgba(250, 250, 250, 0.75)',
  },
  videoStyle: {width: '100%', height: 144},
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 70,
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

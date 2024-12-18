import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {Data} from '../utils/verseBoxDemoData';
import VerseBox from '../common/VerseBox';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';
import React from 'react';
import {ScreenProps} from '../navigation/Stack';

const History: React.FC<ScreenProps<'History'>> = ({navigation}) => {
  const handleDetails = (id: any) => {
    navigation.navigate('VerseDetails', {
      verseId: id, // Pass only the verse ID
    });
  };  
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
        renderItem={({item}) => (
          <VerseBox
            id={item.id}
            title={item.title}
            reference={item.reference}
            verse={item.verse}
            commentNumber={item.commentNumber}
            OnPressDetails={handleDetails.bind(null,item.id)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default History;

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
    paddingBottom: 30,
    marginBottom: 60,
    paddingTop: 0,
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

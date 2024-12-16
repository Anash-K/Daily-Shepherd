import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';
import {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps} from '../navigation/Stack';


const VerseBox = memo((data: any, OnPressDetails?) => {
  const navigation =
    useNavigation<ScreenProps<'VerseOfTheDay'>['navigation']>();

  const handleComments = () => {
    navigation.navigate('Comments');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => OnPressDetails(data)}>
      <View style={styles.verseHeader}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.reference}>{data.reference}</Text>
        </View>

        <TouchableOpacity style={styles.listenButton}>
          <Image source={CustomImages.speakerIcon} style={styles.speakerIcon} />
          <Text style={styles.listenText}>Listen</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.verse}>{data.verse}</Text>

      <View style={styles.actionsBox}>
        <View style={styles.likeAndCommentBox}>
          <TouchableOpacity style={styles.like}>
            <Image source={CustomImages.likedIcon} style={styles.likedIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.comment} onPress={handleComments}>
            <Image
              source={CustomImages.commentIcon}
              style={styles.commentIcon}
            />
            <Text style={styles.listenText}>{data.commentNumber}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.like}>
          <Image source={CustomImages.shareIcon} style={styles.likedIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});


export default VerseBox;

const styles = StyleSheet.create({
  speakerIcon: {width: 14, height: 14},
  verseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  commentIcon: {width: 20, height: 20},
  container: {
    backgroundColor: 'rgba(32, 33, 38, 1)',
    marginBottom: 16,
    padding: 16,
    borderRadius: 20,
  },
  actionsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  likeAndCommentBox: {
    flexDirection: 'row',
    columnGap: 12,
  },
  likedIcon: {
    width: 20,
    height: 20,
  },
  like: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 31,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    columnGap: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 31,
  },
  share: {},
  titleBox: {},
  listenButton: {
    flexDirection: 'row',
    columnGap: 6,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 34,
  },
  title: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 19.2,
    color: 'rgba(255, 255, 255, 1)',
    marginBottom: 8,
  },
  reference: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 18,
    lineHeight: 21.6,
    color: 'rgba(255, 255, 255, 1)',
  },
  listenText: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 14,
    lineHeight: 16.8,
    color: 'rgba(255, 255, 255, 1)',
  },
  verse: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 24,
    lineHeight: 32.16,
    color: 'rgba(255, 255, 255, 1)',
  },
});

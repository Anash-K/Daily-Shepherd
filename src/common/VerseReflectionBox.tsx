import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';

const VerseReflectionBox = (data: any) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{data.title}</Text>
        <TouchableOpacity style={styles.showDetailsButton}>
          <Image source={CustomImages.rightArrow} />
        </TouchableOpacity>
      </View>

      <Text style={styles.verseReflection}>{data.content}</Text>
    </View>
  );
};

export default VerseReflectionBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(32, 33, 38, 1)',
    borderRadius: 15,
    padding: 16,
  },
  showDetailsButton: {
    backgroundColor: 'rgba(32, 201, 151, 1)',
    borderRadius: 24,
    padding: 5,
  },
  verseReflection: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 16,
    lineHeight: 19.2,
    color: 'rgba(255, 255, 255, 1)',
  },
  title: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 19.2,
    color: 'rgba(255, 255, 255, 1)',
  },
});

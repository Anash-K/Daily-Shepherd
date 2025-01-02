import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';
import React, {memo} from 'react';

interface VerseReflectionBoxProps {
  title: string;
  content: string;
  OnPressLink: () => void
}

const VerseReflectionBox: React.FC<VerseReflectionBoxProps> = memo(
  ({title, content, OnPressLink}) => {
    return (
      <View style={styles.container}>
        <View style={styles.topHeadingBox}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.showDetailsButton} onPress={OnPressLink}>
            <Image
              source={CustomImages.crossArrow}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.verseReflection}>{content}</Text>
      </View>
    );
  },
);

export default VerseReflectionBox;

const styles = StyleSheet.create({
  arrowIcon: {
    width: 10,
    height: 12,
    // transform: [{rotate: '-40deg'}], // Corrected transform property
  },
  topHeadingBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  container: {
    backgroundColor: 'rgba(32, 33, 38, 1)',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
  },
  showDetailsButton: {
    backgroundColor: 'rgba(32, 201, 151, 1)',
    borderRadius: 24,
    padding: 6,
    paddingHorizontal: 7,
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

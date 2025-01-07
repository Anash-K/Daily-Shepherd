import React, {memo} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';

interface NoDataFoundType {
  title?: string;
}

const NoDataFound: React.FC<NoDataFoundType> = memo(({title}) => {
  return (
    <View style={styles.container}>
      <FastImage source={CustomImages.noDataFound} style={styles.icon} />
      <Text style={styles.noHistory}>{title ? title : 'No data found!'}</Text>
    </View>
  );
});

export default NoDataFound;

const styles = StyleSheet.create({
  icon: {
    width: 125,
    height: 125,
  },
  noHistory: {
    color: '#FAFAFA',
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 28.8,
    fontFamily: CustomFont.Urbanist600,
    marginTop: 24,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

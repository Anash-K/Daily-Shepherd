import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomFont from '../assets/customFonts';

const NoComments: React.FC = memo(() => {
  return (
    <View style={style.container}>
      <Text style={style.title}>No comments yet!</Text>
      <Text style={style.subTitle}>Start the conversation</Text>
    </View>
  );
});

export default NoComments;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 24,
    lineHeight: 28.8,
    textAlign: 'center',
    color: '#FAFAFA',
    marginBottom: 8,
  },
  subTitle: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 21.6,
    textAlign: 'center',
    color: '#FAFAFA',
  },
});

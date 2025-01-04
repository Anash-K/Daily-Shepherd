import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface NoDataFound {
  title: string;
}

const NoDataFound: React.FC<NoDataFound> = memo(({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.noHistory}>No history found</Text>
    </View>
  );
});

export default NoDataFound;

const styles = StyleSheet.create({
  noHistory: {
    color: '#20C997',
    textAlign: 'center',
    fontSize: 16,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

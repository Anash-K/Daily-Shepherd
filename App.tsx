import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import './gesture-handler';
import BootSplash from 'react-native-bootsplash';
import Login from './src/screens/Login';

function App(): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      BootSplash.hide({fade: true});
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Login />
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

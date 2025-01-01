import React, {forwardRef, memo, useImperativeHandle, useState} from 'react';
import {Modal, View, StyleSheet, ActivityIndicator} from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import {Loader as LoaderType} from '../types/CommonTypes';

const Loader = memo(
  forwardRef<LoaderType>((_, ref) => {
    const [isLoader, setIsLoader] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      start() {
        setIsLoader(true);
      },
      stop() {
        setIsLoader(false);
      },
    }));

    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={isLoader}
        onRequestClose={() => setIsLoader(false)}>
        <View style={styles.overlay}>
          <ActivityIndicator
            style={styles.loader}
            size={80}
            color="rgba(32, 201, 151, 1)"
          />
        </View>
      </Modal>
    );
  }),
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loader: {
    width: 250,
    height: 250,
    color: 'rgba(32, 201, 151, 1)',
  },
});

export default Loader;

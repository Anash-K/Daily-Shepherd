import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Toast} from 'react-native-alert-notification';
import {ALERT_TYPE} from 'react-native-alert-notification';

interface CustomToastProps {
  type: ALERT_TYPE;
  message: string;
  title?: string;
}

export const ErrorToaster = ({type, message, title}: CustomToastProps) => {
  Toast.show({
    type,
    title: title || type.charAt(0).toUpperCase() + type.slice(1),
    textBody: message,
    autoClose: true,
  });
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  message: {
    fontSize: 14,
    color: '#ccc',
  },
});

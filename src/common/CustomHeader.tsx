import React from "react";
import { View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Text } from "react-native-paper";

interface CustomHeaderProps {
  title: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, containerStyle, textStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8f8f8", // Default background color
    alignItems: "center", // Default center alignment
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333", // Default text color
  },
});

export default CustomHeader;

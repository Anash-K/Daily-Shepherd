import React, { ReactNode } from "react";
import { Platform, StyleSheet, View } from "react-native";

interface ScreenWrapperProps {
    children: ReactNode; // Represents any valid React node
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: Platform.select({ ios: 20, android: 30 }),
        
    },
});

import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientWrapperProps {
    children: React.ReactNode;
    style?: ViewStyle;
    hideGlow?: boolean
}

const GradientWrapper = ({
    children,
    style,
    hideGlow
}: GradientWrapperProps) => {
    return (
        <LinearGradient
            colors={["#05010D", "#140821", "#24103D", "#05010D"]}
            locations={[0, 0.4, 0.75, 1]}
            style={[styles.container, style]}
        >
            {!hideGlow && <LinearGradient
                colors={[
                    "rgba(168,85,247,0.30)",
                    "rgba(168,85,247,0.10)",
                    "transparent",
                ]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.glow}
            />}

            {children}
        </LinearGradient>
    );
};

export default GradientWrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    glow: {
        position: "absolute",
        top: -120,
        alignSelf: "center",
        width: 350,
        height: 350,
        borderRadius: 999,
    },
});
import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'


const Dot = ({ delay }: { delay: number }) => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 400,
                    useNativeDriver: true
                })
            ])
        );
        animation.start();
        return () => animation.stop();
    }, [])

    return <Animated.View style={[styles.dot, { opacity }]} />
}


const TypingIndicator = ({ visible }: { visible: boolean }) => {

    if (!visible) {
        return null;
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.bubble}>
                <Dot delay={0} />
                <Dot delay={150} />
                <Dot delay={300} />
            </View>
        </View>
    )
}

export default TypingIndicator

const styles = StyleSheet.create({
    wrapper: {
        alignItems: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    bubble: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1F2937",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 18,
        borderTopLeftRadius: 0,
        gap: 5,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#9CA3AF",
    },
});
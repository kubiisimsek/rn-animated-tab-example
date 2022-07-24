import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'

import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolateColor, interpolate, Extrapolate } from 'react-native-reanimated'


const DEVICE_WIDTH = Dimensions.get("window").width

const CustomTab = ({ state, descriptors, navigation }) => {
    let animatedValue = useSharedValue(0)
    const [activeIndex, setActiveIndex] = useState(0)
    const { routes } = state


    const onTabPress = (route, isFocused, index) => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            setActiveIndex(index)
            animatedValue.value = withTiming(index)
            navigation.navigate({ name: route.name, merge: true });
        }
    }


    const routeCount = routes.length
    const buttonWidth = DEVICE_WIDTH / routeCount
    const inputRange = Array(routeCount).fill(0).map((_, index) => index)
    const outputRange = Array(routeCount).fill(0).map((_, index) => (buttonWidth * index) + (buttonWidth / 2) - 18) // 18 is circleWidth / 2

    const circleStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: interpolate(animatedValue.value, inputRange, outputRange, Extrapolate.CLAMP)
            }]
        }
    })

    const getIconStyle = (ind) => {
        return useAnimatedStyle(() => {
            return {
                color: interpolateColor(animatedValue.value, inputRange, Array(routeCount).fill(0).map((_, index) => index == ind ? "#fff" : "#aaa"))
            }
        })
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.absoluteCircle, circleStyle]} />
            {
                routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const getIcon = (name) => {
                        let iconName = ""
                        if (name == "Home") iconName = "home"
                        else if (name == "Search") iconName = "search"
                        else if (name == "Favorites") iconName = "heart"
                        else if (name == "Settings") iconName = "settings"

                        return iconName
                    }

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.tabButton]}
                            onPress={() => onTabPress(route, isFocused, index)}
                            activeOpacity={0.7}
                        >
                            <Animated.Text style={getIconStyle(index)}>
                                <Ionicons name={getIcon(route.name)} size={22} />
                            </Animated.Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    tabButton: {
        flex: 1,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    absoluteCircle: {
        position: 'absolute',
        left: 0,
        top: 12,
        backgroundColor: "#eb8126",
        width: 36,
        height: 36,
        borderRadius: 18
    }
})

export default CustomTab;

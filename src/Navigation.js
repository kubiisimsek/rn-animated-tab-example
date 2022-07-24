import React from 'react';
import { View, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './screens/Home';

const Tab = createBottomTabNavigator()

const Navigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({})

export default Navigation;

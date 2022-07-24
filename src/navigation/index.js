import React from 'react';
import { View, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home';
import CustomTab from './CustomTab';

const Tab = createBottomTabNavigator()

const Navigation = () => {

    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <CustomTab {...props} />}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Home} />
            <Tab.Screen name="Favorites" component={Home} />
            <Tab.Screen name="Settings" component={Home} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({})

export default Navigation;

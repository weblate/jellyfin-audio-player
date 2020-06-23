import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Player from './Player';
import Music from './Music';
import Settings from './Settings';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import SetJellyfinServer from './modals/SetJellyfinServer';
import { CompositeNavigationProp } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

type Screens = {
    NowPlaying: undefined;
    Music: undefined;
    Settings: undefined;
}

function Screens() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="NowPlaying" component={Player} options={{ tabBarLabel: 'Now Playing' }} />
            <Tab.Screen name="Music" component={Music} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}

type Routes = {
    Screens: undefined;
    SetJellyfinServer: undefined;
}


export default function Routes() {
    return (
        <Stack.Navigator mode="modal" headerMode="none" screenOptions={{
            cardStyle: {
                backgroundColor: 'transparent'
            }
        }}>
            <Stack.Screen name="Screens" component={Screens} />
            <Stack.Screen name="SetJellyfinServer" component={SetJellyfinServer} />
        </Stack.Navigator>
    );
}

export type NavigationProp = CompositeNavigationProp<
    StackNavigationProp<Routes>,
    BottomTabNavigationProp<Screens>
>;
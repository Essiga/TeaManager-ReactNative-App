/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Alert, ColorSchemeName, Pressable, TouchableOpacity, View} from 'react-native';
import {BottomNavigation, Button, Text} from 'react-native-paper';
import axios from 'axios';
import AddNewTea from '../screens/AddNewTea';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import VesselScreen from '../screens/VesselScreen';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import {createDrawerNavigator} from "@react-navigation/drawer";
import TeaOverview from "../screens/TeaOverview";
import MyList from "../components/MyList";

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <BottomTabNavigator/>
        </NavigationContainer>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="TeaOverview"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}>
            <BottomTab.Screen
                name="Vessel"
                component={VesselScreen}
                options={{
                    title: 'Vessel',
                    tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="TeaOverview"
                component={TeaOverview}
                options={{
                    title: 'Tea Overview',
                    tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="NewTea"
                component={AddNewTea}
                options={{
                    title: 'Add Tea',
                    tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
}

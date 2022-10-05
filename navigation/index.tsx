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
import {Button} from 'react-native-paper';
import axios from 'axios';
import AddNewTea from '../screens/AddNewTea';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TeasScreen from '../screens/TeasScreen';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import {createDrawerNavigator} from "@react-navigation/drawer";
import TeaOverview from "../screens/TeaOverview";

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
            {/*<RootDrawerNavigator/>*/}
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="Modal" component={ModalScreen}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}

/**
 * A root drawer navigator
 */

const axiosInstance = axios.create({baseURL: 'http://172.31.162.103:3000/'});

function HomeScreen({navigation}: any) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button
                mode="outlined"
                onPress={() => {
                    navigation.navigate('Notifications');

                    // axiosInstance.get('viewAllTeas')
                    //     .then((response) => {
                    //         console.log(response.data);
                    //     })
                    //     .catch((err) => {
                    //         console.log(err);
                    //     });
                }}
            >
                Lets get the teas
            </Button>
        </View>
    );
}

function NotificationsScreen({navigation}: any) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button mode="contained" onPress={() => navigation.goBack()}>Go back home</Button>
        </View>
    );
}

const Drawer = createDrawerNavigator();

function RootDrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="Notifications" component={NotificationsScreen}/>
        </Drawer.Navigator>
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
            initialRouteName="Tea"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}>
            <BottomTab.Screen
                name="Tea"
                component={TeasScreen}
                options={{
                    title: 'Teas',
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

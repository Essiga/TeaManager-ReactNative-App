import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import VesselScreen from '../screens/VesselScreen';
import {RootStackParamList, RootTabParamList} from '../types';
import TeaScreen from "../screens/TeaScreen";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faBook, faChevronLeft, faLeaf, faMugHot} from '@fortawesome/free-solid-svg-icons'
import {TouchableRipple} from "react-native-paper";
import SessionScreen from "../screens/SessionScreen";
import {AddVesselModal} from "../components/modal/AddVesselModal";
import {TouchableOpacity} from "react-native";
import AddNewTeaModal from "../components/modal/AddNewTeaModal";
import {AddSessionModal} from "../components/modal/AddSessionModal";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {DetailedTeaModal} from "../components/modal/DetailedTeaModal";
import {UpdateTeaModal} from "../components/modal/UpdateTeaModal";
import {DetailedSessionModal} from "../components/modal/DetailedSessionModal";
import {LogBox} from 'react-native';

export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator/>
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
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Group
                screenOptions={({navigation}) => ({
                    presentation: 'modal',
                    headerLeft: (_props) => {
                        return (
                            <TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.goBack()}>
                                <FontAwesomeIcon {..._props} icon={faChevronLeft}/>
                            </TouchableOpacity>
                        )
                    },
                    headerStyle: {
                        backgroundColor: '#ded8c1',
                    },
                })}
            >
                <Stack.Screen
                    name="AddNewTeaModal"
                    component={AddNewTeaModal}
                    options={{title: "Add Tea"}}
                />
                <Stack.Screen
                    name="AddSessionModal"
                    component={AddSessionModal}
                    options={{title: "Add Session"}}
                />
                <Stack.Screen
                    name="AddVesselModal"
                    component={AddVesselModal}
                    options={{title: "Add Vessel"}}
                />
                <Stack.Screen
                    name="DetailedSessionModal"
                    component={DetailedSessionModal}
                    options={{title: "Session Info"}}
                />
                <Stack.Screen
                    name="DetailedTeaModal"
                    component={DetailedTeaModal}
                    options={{title: "Tea Info"}}
                />
                <Stack.Screen
                    name="UpdateTeaModal"
                    component={UpdateTeaModal}
                    options={{title: "Update Tea"}}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

const Tab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

    return (
        <Tab.Navigator
            initialRouteName="TeaScreen"
            screenOptions={() => ({
                tabBarActiveTintColor: '#7b8f4b',
                tabBarInactiveTintColor: 'grey',
                tabBarActiveBackgroundColor: '#f0ead2',
                tabBarInactiveBackgroundColor: '#f0ead2',
                tabBarLabelStyle: {
                    marginBottom: 3
                },
                tabBarButton: (props) => <TouchableRipple{...props}/>
            })}
        >
            <Tab.Group
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#ded8c1',
                    },
                }}
            >
                <Tab.Screen
                    name="TeaScreen"
                    component={TeaScreen}
                    options={{
                        title: 'Teas',
                        tabBarIcon: ({color}) => <FontAwesomeIcon icon={faLeaf} color={color}/>
                    }}
                />
                <Tab.Screen
                    name="VesselScreen"
                    component={VesselScreen}
                    options={{
                        title: 'Vessels',
                        tabBarIcon: ({color}) => <FontAwesomeIcon icon={faMugHot} color={color}/>
                    }}
                />
                <Tab.Screen
                    name="SessionScreen"
                    component={SessionScreen}
                    options={{
                        title: 'Sessions',
                        tabBarIcon: ({color}) => <FontAwesomeIcon icon={faBook} color={color}/>
                    }}
                />
            </Tab.Group>
        </Tab.Navigator>
    );
}

/**
 * We can ignore this warning (see below -> ignoreLogs) because we are not using the deep linking functionality
 * https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
 */

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

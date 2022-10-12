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
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}}/>

            <Stack.Group
                screenOptions={({navigation}) => ({
                    presentation: 'modal',
                    headerLeft: (_props) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <FontAwesomeIcon {..._props} icon={faChevronLeft}/>
                            </TouchableOpacity>
                        )
                    },
                })}
            >
                <Stack.Screen name="AddNewTeaModal" component={AddNewTeaModal} options={{title: "test"}}/>
                <Stack.Screen name="AddSessionModal" component={AddSessionModal}/>
                <Stack.Screen name="AddVesselModal" component={AddVesselModal}/>
                <Stack.Screen name="DetailedSessionModal" component={DetailedSessionModal}/>
                <Stack.Screen name="DetailedTeaModal" component={DetailedTeaModal}/>
                <Stack.Screen name="UpdateTeaModal" component={UpdateTeaModal}/>
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
            initialRouteName="TeaOverview"
            screenOptions={() => ({
                tabBarActiveTintColor: '#7b8f4b',
                tabBarInactiveTintColor: 'grey',
                tabBarActiveBackgroundColor: '#F0EAD2',
                tabBarInactiveBackgroundColor: '#F0EAD2',
                tabBarLabelStyle: {marginBottom: 3},
                tabBarButton: (props) => <TouchableRipple{...props}/>
            })}
        >
            <Tab.Screen
                name="TeaOverview"
                component={TeaScreen}
                options={{
                    title: 'Teas',
                    tabBarIcon: ({color}) => <FontAwesomeIcon icon={faLeaf} color={color}/>,
                    headerStyle: {
                        backgroundColor: '#ded8c1',
                    },
                }}
            />
            <Tab.Screen
                name="Vessel"
                component={VesselScreen}
                options={{
                    title: 'Vessels',
                    tabBarIcon: ({color}) => <FontAwesomeIcon icon={faMugHot} color={color}/>,
                    headerStyle: {
                        backgroundColor: '#ded8c1',
                    },
                }}
            />
            <Tab.Screen
                name="Sessions"
                component={SessionScreen}
                options={{
                    title: 'Sessions',
                    tabBarIcon: ({color}) => <FontAwesomeIcon icon={faBook} color={color}/>,
                    headerStyle: {
                        backgroundColor: '#ded8c1',
                    },
                }}
            />
        </Tab.Navigator>
    );
}

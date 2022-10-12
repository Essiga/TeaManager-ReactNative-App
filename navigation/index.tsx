import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import VesselScreen from '../screens/VesselScreen';
import {RootTabParamList} from '../types';
import TeaOverviewScreen from "../screens/TeaOverviewScreen";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faLeaf, faMugHot} from '@fortawesome/free-solid-svg-icons'
import {TouchableRipple} from "react-native-paper";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function Navigation() {

    return (
        <NavigationContainer>
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
                    component={TeaOverviewScreen}
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
            </Tab.Navigator>
        </NavigationContainer>
    );
}

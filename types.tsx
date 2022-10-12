/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AddVesselModal} from "./components/modal/AddVesselModal";
import {UpdateTeaModal} from "./components/modal/UpdateTeaModal";

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {
        }
    }
}

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    AddNewTeaModal: undefined;
    AddVesselModal: undefined;
    AddSessionModal: undefined;
    DetailedTeaModal: undefined;
    UpdateTeaModal: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList>
    = NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
    Vessel: undefined;
    TeaOverview: undefined;
    Sessions: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList>
    = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, Screen>, NativeStackScreenProps<RootStackParamList>>;

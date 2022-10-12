/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IDetailedTeaModalProps} from "./components/modal/api/IDetailedTeaModalProps";
import {IUpdateTeaModalProps} from "./components/modal/api/IUpdateTeaModalProps";
import {IAddSessionModalProps} from "./components/modal/api/IAddSessionModalProps";
import {IAddVesselModalProps} from "./components/modal/api/IAddVesselModalProps";
import {IAddNewTeaModal} from "./components/modal/api/IAddNewTeaModal";
import {IDetailedSessionModalProps} from "./components/modal/api/IDetailedSessionModalProps";
import {ISessionScreen} from "./screens/api/ISessionScreen";
import {IVesselScreen} from "./screens/api/IVesselScreen";
import {ITeaScreen} from "./screens/api/ITeaScreen";

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {
        }
    }
}

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    AddNewTeaModal: IAddNewTeaModal;
    AddVesselModal: IAddVesselModalProps;
    AddSessionModal: IAddSessionModalProps;
    DetailedSessionModal: IDetailedSessionModalProps;
    DetailedTeaModal: IDetailedTeaModalProps;
    UpdateTeaModal: IUpdateTeaModalProps;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList>
    = NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
    TeaScreen: ITeaScreen;
    VesselScreen: IVesselScreen;
    SessionScreen: ISessionScreen;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList>
    = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, Screen>, NativeStackScreenProps<RootStackParamList>>;

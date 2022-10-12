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
import {IAddNewTeaModalProps} from "./components/modal/api/IAddNewTeaModalProps";
import {IDetailedSessionModalProps} from "./components/modal/api/IDetailedSessionModalProps";
import {ISessionScreenProps} from "./screens/api/ISessionScreenProps";
import {IVesselScreenProps} from "./screens/api/IVesselScreenProps";
import {ITeaScreenProps} from "./screens/api/ITeaScreenProps";

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {
        }
    }
}

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    AddNewTeaModal: IAddNewTeaModalProps;
    AddVesselModal: IAddVesselModalProps;
    AddSessionModal: IAddSessionModalProps;
    DetailedSessionModal: IDetailedSessionModalProps;
    DetailedTeaModal: IDetailedTeaModalProps;
    UpdateTeaModal: IUpdateTeaModalProps;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList>
    = NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
    TeaScreen: ITeaScreenProps;
    VesselScreen: IVesselScreenProps;
    SessionScreen: ISessionScreenProps;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList>
    = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, Screen>, NativeStackScreenProps<RootStackParamList>>;

import {
    GestureResponderEvent,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';


import {Text, View} from '../components/Themed';

import {Button, List, Provider as PaperProvider, TextInput} from "react-native-paper";
import theme from './AddNewTea'
import React, {useEffect, useState} from "react";
import {Modal, ScrollView, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {Button, List} from "react-native-paper";
import {VesselApi} from "../openAPI";
import {Vessel} from "../openAPI";
import {AddVesselModal} from "../components/AddVesselModal";

let vesselApi = new VesselApi();


export default function VesselScreen(props: any) {

    const [vessels, setVessels] = useState([] as Vessel[]);
    const [addVesselModalVisible, setAddVesselModalVisible] = useState(false);

    function toggleVesselModalVisibility() {
        setAddVesselModalVisible(false);
    }

    function getAllVessels() {

        vesselApi.viewAllVessels().then((data) => {
            setVessels(data.data as Vessel[]);
        }, (err) => {
            console.log(err);
        });
    }

    useEffect(() => {

        getAllVessels();

        return props.navigation.addListener('tabPress', () => {
            getAllVessels();
        });
    }, [props.navigation])

    function deleteVessel(id: any) {
        let vesselApi = new VesselApi();
        vesselApi.deleteVessel(id).then((data) => {
            console.log(data.data);
        }, (err) => {
            console.log(err);
        })
        console.log('from the function now', id)
    }

    return (
        <>
            <View>
                <ScrollView>
                    {vessels.map((item: Vessel, i: number) => (
                        <List.Item
                            style={{maxWidth: '100%', width: 800}}
                            titleNumberOfLines={1}
                            key={i}
                            titleEllipsizeMode={"tail"}
                            title={item.name.length < 35 ? `${item.name}` : `${item.name.substring(0, 32)}...`}
                            left={props => <List.Icon {...props} icon="tea"/>}
                            right={props => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        deleteVessel(item.id)
                                    }}>
                                        <List.Icon {...props} icon="delete"/>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    ))}
                </ScrollView>
                <Modal visible={addVesselModalVisible} onDismiss={() => {
                    setAddVesselModalVisible(false)
                }}>
                    <AddVesselModal toggleAddVesselModalVisibility={toggleVesselModalVisibility}></AddVesselModal>
                </Modal>


                <View style={styles.container}>
                    <View style={styles.button}>
                        <Button icon="tea" mode="contained" onPress={() => {
                            setAddVesselModalVisible(true)
                        }}>
                            Add Vessel
                        </Button>
                        <Button icon="refresh" mode="contained" onPress={() => getAllVessels()}>refresh </Button>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        bottom: 0,
        alignSelf: 'center',
        position: 'absolute',
        padding: 10,
        width: 400,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    button: {
        flexDirection: "row",
        paddingTop: 10,
        justifyContent: 'space-between',
        alignItems: "center",
        paddingLeft: 20,
        paddingEnd: 20,
    },
});

import React, {useEffect, useState} from "react";
import {Modal, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {ActivityIndicator, AnimatedFAB} from "react-native-paper";
import {Vessel, VesselApi} from "../openAPI";
import {AddVesselModal} from "../components/AddVesselModal";
import VesselList from "../components/VesselList";

let vesselApi = new VesselApi();

export default function VesselScreen(props: any) {

    const [vessels, setVessels] = useState([] as Vessel[]);
    const [addVesselModalVisible, setAddVesselModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {

        getAllVessels();

        return props.navigation.addListener('tabPress', () => {
            getAllVessels();
        });
    }, [props.navigation]);

    function getAllVessels() {
        vesselApi.viewAllVessels()
            .then(
                (data) => {
                    setVessels(data.data as Vessel[]);
                }, (err) => {
                    console.log(err);
                }
            )
            .finally(() => {
                setLoading(false);
            });
    }

    function toggleVesselModalVisibility() {
        setAddVesselModalVisible(false);
    }

    function deleteVessel(removeIndex: any) {

        vesselApi.deleteVessel(removeIndex).then(
            (response) => {
                setVessels(vessels => {
                    return vessels.filter((vessel) => {
                        return vessel.id !== removeIndex;
                    });
                });

                console.log(response.data);
                console.log(removeIndex);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    console.log(vessels);

    return isLoading ? (
        <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="small" color="lightgrey"/>
        </View>
    ) : (
        <View>
            <VesselList
                vessels={vessels}
                deleteVessel={(id: number) => deleteVessel(id)}
            />

            <Modal
                visible={addVesselModalVisible}
                onDismiss={() => setAddVesselModalVisible(false)}
            >
                <AddVesselModal toggleAddVesselModalVisibility={toggleVesselModalVisibility}></AddVesselModal>
            </Modal>

            <AnimatedFAB
                icon={'plus'}
                label={''}
                extended={false}
                onPress={() => setAddVesselModalVisible(true)}
                visible={true}
                animateFrom={'right'}
                iconMode={'static'}
                style={[styles.fabStyle, {right: 16}]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    fabStyle: {
        bottom: 72,
        right: 16,
        position: 'absolute',
        alignItems: 'center'
    },
});

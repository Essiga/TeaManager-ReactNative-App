import React, {useEffect, useState} from "react";
import {Alert, StyleSheet} from 'react-native';
import {View} from "react-native";
import {ActivityIndicator, AnimatedFAB} from "react-native-paper";
import {Vessel, VesselApi} from "../openAPI";
import {AddVesselModal} from "../components/modal/AddVesselModal";
import VesselViewList from "../components/VesselViewList";
import {RootTabScreenProps} from "../types";

let vesselApi = new VesselApi();

export default function VesselScreen(navProps: RootTabScreenProps<"VesselScreen">) {

    const [vessels, setVessels] = useState([] as Vessel[]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {

        callViewAllVessels();

        return navProps.navigation.addListener('focus', () => {
            setLoading(true);
            callViewAllVessels();
        });
    }, [navProps.navigation]);

    function callViewAllVessels() {
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

    function deleteVessel(removeIndex: any) {

        vesselApi.deleteVessel(removeIndex).then(
            (response) => {
                setVessels(vessels => {
                    return vessels.filter((vessel) => {
                        return vessel.id !== removeIndex;
                    });
                });

                Alert.alert("Vessel deleted successfully 😁");
            },
            (err) => {
                console.log(err);
            }
        );
    }

    return isLoading ? (
        <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="small" color="lightgrey"/>
        </View>
    ) : (
        <View>
            <VesselViewList
                vessels={vessels}
                deleteVessel={(id: number) => deleteVessel(id)}
            />

            <AnimatedFAB
                icon={'plus'}
                label={''}
                extended={false}
                onPress={() => {
                    navProps.navigation.navigate("AddVesselModal", {});
                }}
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

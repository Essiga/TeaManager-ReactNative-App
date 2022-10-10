import {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Button, Text, TextInput} from "react-native-paper";
import {IAddVesselModalProps} from "./api/IAddVesselModalProps";
import {Vessel, VesselApi} from "../openAPI";

let vesselApi = new VesselApi();

export function AddVesselModal(props: IAddVesselModalProps) {
    const [newVessel, setNewVessel] = useState("");
    const [capacity, setCapacity] = useState(0);

    function sendData(newVessel: string, capacity: number) {
        let vessel: Vessel = {
            name: newVessel,
            capacity: capacity,
        }

        vesselApi.addVessel(vessel).then((response) => {
            alert(response.data);
        }, (err) => {
            console.log(err);
        })
    }

    return (
        <View style={styles.dropDown}>
            <View>
                <Text
                    variant="titleLarge"
                    style={{paddingStart: 20, paddingEnd: 20, paddingBottom: 10, textAlign: "center"}}
                >
                    Add Vessel
                </Text>
                <TextInput
                    label="Vessel name"
                    value={newVessel}
                    onChangeText={text => setNewVessel(text)}
                />
                <TextInput
                    label="Capacity"
                    value={capacity.toString()}
                    onChangeText={text => setCapacity(parseInt(text))}
                />
            </View>
            <View style={styles.container}>
                <View style={styles.button}>
                    <Button
                        icon="tea"
                        mode="contained"
                        onPress={() => sendData(newVessel, capacity)}
                    >
                        Add Vessel
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={() => props.toggleAddVesselModalVisibility()}
                    >
                        Return
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        padding: 50,
    },
    button: {
        flexDirection: "row",
        //paddingTop: 10,
        justifyContent: 'space-between',
        marginTop: "105%",

    },
    dropDown: {
        justifyContent: 'space-between',
        paddingTop: 5,
        flex: 1,
    }
});

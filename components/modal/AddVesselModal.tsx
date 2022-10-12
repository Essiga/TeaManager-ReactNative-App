import {useState} from "react";
import {Alert, SafeAreaView, StyleSheet, View} from "react-native";
import {Button, TextInput, Provider as PaperProvider} from 'react-native-paper';
import Theme from '../../constants/Theme';
import {Vessel, VesselApi} from "../../openAPI";
import {RootStackScreenProps} from "../../types";

let vesselApi = new VesselApi();

export function AddVesselModal(navProps: RootStackScreenProps<"AddVesselModal">) {

    const [newVessel, setNewVessel] = useState("");
    const [capacity, setCapacity] = useState(0);

    function sendData(newVessel: string, capacity: number) {
        let vessel: Vessel = {
            name: newVessel,
            capacity: capacity,
        }

        vesselApi.addVessel(vessel).then(
            (response) => {
                Alert.alert("Vessel added successfully 😁");

                navProps.navigation.goBack();
            },
            (err) => {
                console.log(err);
            }
        );
    }

    return (
        <PaperProvider theme={Theme}>
            <SafeAreaView style={styles.dropDown}>
                <View>
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
                    </View>
                </View>
            </SafeAreaView>
        </PaperProvider>
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

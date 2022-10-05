import {SafeAreaView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {Button, List, Provider as PaperProvider, TextInput} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import theme from './AddNewTea'
import {useState} from "react";
import {TeaType} from "../openAPI";

export default function VesselScreen({navigation}: RootTabScreenProps<'Vessel'>) {

    const [vesselModalVisible, setVesselModalVisible] = useState(false);




    return (
        <PaperProvider theme={theme}>

            <Text> To do add Vessel Overview </Text>

            <View style={styles.container}>
                <View style={styles.button}>
                    <Button icon="Vessel" mode="contained"
                            onPress={() => {
                                console.log("pressed")
                            }}>
                        Add Vessel
                    </Button>
                    <Button icon="reload" mode="contained" onPress={() => console.log("reload")}>reload </Button>
                </View>
            </View>

        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        padding: 50,
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

    },
});

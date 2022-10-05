import {Modal, SafeAreaView, ScrollView, StyleSheet} from 'react-native';


import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {Button, List, Provider as PaperProvider, TextInput} from "react-native-paper";
import theme from './AddNewTea'
import {useEffect, useState} from "react";
import {VesselApi} from "../openAPI";
import {Vessel} from "../openAPI";
import {AddVesselModal} from "../components/AddVesselModal";


export default function VesselScreen(props: any) {

    let vesselArray: Vessel[] = [];
    const [vessels, setVessels] = useState(vesselArray);
    const [addVesselModalVisible, setAddVesselModalVisible] = useState(false);

    let defaultVessel: Vessel = {
        id: "0",
        name: "name",
        capacity: 0,
    }

    function toggleVesselModalVisibility() {
        setAddVesselModalVisible(false);
    }

    useEffect(() => {
        props.navigation.addListener('tabPress', (e: any) => {
        let vesselApi = new VesselApi();

        vesselApi.viewAllVessels().then((data) => {
            console.log(data.data);
            setVessels(data.data as Vessel[]);
        }, (err) => {
            console.log(err);
        })
    });
    }, [props.navigation])

    console.log(vessels);

    return (
        <PaperProvider theme={theme}>
            <View>
                <ScrollView>
                    <Text>
                        {vessels.map((item: Vessel, i: number) => (
                            <List.Item style={{maxWidth: '100%', width: 800}}
                                       titleNumberOfLines={1}
                                       key={i}
                                       titleEllipsizeMode={"tail"}
                                       title={item.name.length < 35 ? `${item.name}` : `${item.name.substring(0, 32)}...`}
                                       left={props => <List.Icon {...props} icon="tea"/>}
                            />
                        ))}
                    </Text>
                </ScrollView>
                <Modal visible={addVesselModalVisible} onDismiss={() => {
                    setAddVesselModalVisible(false)
                }}>
                    <AddVesselModal toggleAddVesselModalVisibility={toggleVesselModalVisibility}></AddVesselModal>
                </Modal>
            </View>
            <View style={styles.container}>
                <View style={styles.button}>
                    <Button icon="tea" mode="contained"
                            onPress={() => {
                                setAddVesselModalVisible(true)
                                console.log("pressed add vessel")
                            }
                            }>
                        Add Vessel
                    </Button>
                    <Button icon="reload" mode="contained" onPress={() => console.log("pressed")}>reload </Button>
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
        marginTop: "105%",

    },
});

import {IAddSessionModalProps} from "./api/IAddSessionModalProps";
import {Button, TextInput, Text} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import {SafeAreaView, StyleSheet} from 'react-native';
import {DefaultTheme, List, ListItemProps, Provider as PaperProvider} from 'react-native-paper';
import {useEffect, useState} from "react";
import {Tea, TeaApi, TeaType, Vessel, VesselApi} from "../openAPI";
import {View} from "./Themed";

let vesselApi = new VesselApi();

export function AddSessionModal(props: IAddSessionModalProps) {
    const theme = {
        ...DefaultTheme,
        roundness: 4,
        padding: 50,
        version: 3,
        elevation: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: '#006400',
            secondary: '#f1c40f',
            tertiary: '#a1b2c3',
        },
    };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start' // if you want to fill rows left to right
        },
        button: {
            flexDirection: "row",
            paddingTop: 10,
            justifyContent: 'space-between',

        },
        dropDown: {
            justifyContent: 'space-between',
            paddingTop: 5,
            flex: 1,
            //backgroundColor: '#006400'
        },
        itemAmount: {
            width: '40%',
            paddingLeft: 5,
        },
        itemVessel: {
            width: '60%',
            paddingLeft: 35,
            paddingRight: 5,
        }
    });


    let defaultVessel: Vessel = {
        name: "name",
        capacity: 0
    }
    let vesselArray: Vessel[] = [];
    const [showDropDown, setShowDropDown] = useState(false);
    const [vessels, setVessels] = useState(vesselArray);
    const [selectedVessel, setSelectedVessel] = useState();
    const [vesselsDropDown, setVesselsDropDown] = useState([] as any)

    useEffect(() => {

        vesselApi.viewAllVessels().then((data) => {
            setVessels(data.data as Vessel[]);
            let dropDownEntries = [] as any;
            for (let i = 0; i < data.data.length; i++) {

                dropDownEntries.push({
                    label: data.data[i].name + " (" + data.data[i].capacity + "ml)",
                    value: data.data[i].id
                })
            }
            console.log(dropDownEntries);
            setVesselsDropDown(dropDownEntries);

        }, (err) => {
            console.log(err);
        })
    }, []);
    console.log(vesselsDropDown)

    return (
        <PaperProvider>
            <SafeAreaView style={styles.dropDown}>

                <View>

                    <Text variant="headlineMedium" style={{paddingLeft: 5}}>Add Session</Text>
                    <Text variant="bodyLarge"
                          style={{paddingBottom: 15, paddingTop: 15, paddingLeft: 5}}>{props.tea.name}</Text>
                    <Text style={{paddingLeft: 5}}>Type: {props.tea.type}</Text>
                    <Text style={{paddingLeft: 5}}>Price/g: 0.35USD</Text>

                    <View style={styles.container}>
                        <View style={styles.itemAmount}>

                            <TextInput
                                label="Amount [g]"
                                // onChangeText={text => setYear(parseInt(text))}
                            />

                        </View>

                        <View style={styles.itemVessel}>
                            <DropDown
                                theme={theme}
                                label={"Vessel"}
                                visible={showDropDown}
                                dropDownStyle={{width: 240, top: 80,}}
                                showDropDown={() => setShowDropDown(true)}
                                onDismiss={() => setShowDropDown(false)}
                                value={selectedVessel}
                                setValue={setSelectedVessel}
                                list={vesselsDropDown}
                                inputProps={{
                                    right: <TextInput.Icon icon={"arrow-down-drop-circle"}/>
                                }}
                            />

                        </View>
                    </View>
                    <Text>Session Price:</Text>

                    <Button style={{marginTop: "70%"}} mode="outlined"
                            onPress={() => props.toggleAddSessionModalVisibility(false)}> return </Button>


                </View>
            </SafeAreaView>
        </PaperProvider>
    )
}
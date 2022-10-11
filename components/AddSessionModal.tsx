import {IAddSessionModalProps} from "./api/IAddSessionModalProps";
import {Button, TextInput, Text} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {DefaultTheme, List, ListItemProps, Provider as PaperProvider} from 'react-native-paper';
import {useEffect, useState} from "react";
import {Session, SessionApi, Tea, TeaApi, TeaType, Vessel, VesselApi} from "../openAPI";
import {View} from "./Themed";

let vesselApi = new VesselApi();
let sessionApi = new SessionApi();

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
    const [selectedVessel, setSelectedVessel] = useState({label: "", value: ""});
    const [vesselsDropDown, setVesselsDropDown] = useState([] as any)
    const [amount, setAmount] = useState('0');
    const [selectedVesselId, setSelectedVesselId] = useState("");

    function getDateString(timestamp: Date){
        if (!isNaN(timestamp.getTime())) {
            let day = timestamp.getDate() < 10 ? '0' + timestamp.getDate() : timestamp.getDate();
            let month = (timestamp.getMonth() + 1) < 10 ? '0' + (timestamp.getMonth() + 1) : (timestamp.getMonth() + 1);
            let date = timestamp.getFullYear() + '-' + month + '-' + day;

            let hours = timestamp.getHours() < 10 ? '0' + timestamp.getHours() : timestamp.getHours();
            let minutes = timestamp.getMinutes() < 10 ? '0' + timestamp.getMinutes() : timestamp.getMinutes();
            let seconds = timestamp.getSeconds() < 10 ? '0' + timestamp.getSeconds() : timestamp.getSeconds();
            let time = hours + ':' + minutes + ':' + seconds;

            return date + 'T' + time + 'Z';
        }
        return '';
    }

    function checkInput() {

        let date = new Date();
        let currentDate = getDateString(date);

        let session: Session = {
            amount: parseFloat(amount),
            date: currentDate,
            price: parseFloat(((props.tea?.price || 0) * parseFloat(amount)).toFixed(2)),
            teaId: (props.tea?.id || ""),
            vesselId: selectedVesselId

        }

        sendData(session);
    }

    function sendData(session: Session) {

        sessionApi.addSession(session).then(response => {
            console.log(response)
        }, (err) => {
            console.log(err);
        });
    }

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
                    <Text style={{paddingLeft: 5}}>Price/g: {props.tea.price} USD</Text>

                    <View style={styles.container}>
                        <View style={styles.itemAmount}>

                            <TextInput
                                label="Amount [g]"
                                value={amount.toString()}
                                onChangeText={(text) => {
                                    text = text.replace(/[^0-9.]/g, '');
                                    setAmount(text);
                                }}
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
                                value={selectedVesselId}
                                setValue={setSelectedVesselId}
                                list={vesselsDropDown}
                                inputProps={{
                                    right: <TextInput.Icon icon={"arrow-down-drop-circle"}/>
                                }}
                            />

                        </View>
                    </View>
                    <Text>Session Price: {((props.tea?.price || 0) * parseFloat(amount)).toFixed(2)}</Text>

                    <Button mode="outlined"
                            onPress={() => {
                                checkInput();
                                // props.toggleAddSessionModalVisibility(false);
                            }}> save </Button>

                    <Button style={{marginTop: "70%"}} mode="outlined"
                            onPress={() => props.toggleAddSessionModalVisibility(false)}> return </Button>


                </View>
            </SafeAreaView>
        </PaperProvider>
    )
}
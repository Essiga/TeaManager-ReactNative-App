import {useEffect, useState} from "react";
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {IAddSessionModalProps} from "../api/IAddSessionModalProps";
import {Button, Provider as PaperProvider, Text, TextInput} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import Theme from '../../constants/Theme';
import {Session, SessionApi, Vessel, VesselApi} from "../../openAPI";
import {View} from "../Themed";

let vesselApi = new VesselApi();
let sessionApi = new SessionApi();

export function AddSessionModal(props: any) {

    const [showDropDown, setShowDropDown] = useState(false);
    const [vesselsDropDown, setVesselsDropDown] = useState([] as any)
    const [amount, setAmount] = useState('0');
    const [selectedVesselId, setSelectedVesselId] = useState("");

    function getDateString(dateObj: Date) {
        if (!isNaN(dateObj.getTime())) {
            let day = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();
            let month = (dateObj.getMonth() + 1) < 10 ? '0' + (dateObj.getMonth() + 1) : (dateObj.getMonth() + 1);
            let date = dateObj.getFullYear() + '-' + month + '-' + day;

            let hours = dateObj.getHours() < 10 ? '0' + dateObj.getHours() : dateObj.getHours();
            let minutes = dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes();
            let seconds = dateObj.getSeconds() < 10 ? '0' + dateObj.getSeconds() : dateObj.getSeconds();
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
            Alert.alert(response.data);
        }, (err) => {
            console.log(err);
        });
    }

    useEffect(() => {

        vesselApi.viewAllVessels().then(
            (response) => {
                let dropDownEntries = [] as any;

                for (let i = 0; i < response.data.length; i++) {
                    let vesselObj = response.data[i];

                    dropDownEntries.push({
                        label: vesselObj.name + " (" + vesselObj.capacity + "ml)",
                        value: vesselObj.id
                    })
                }

                setVesselsDropDown(dropDownEntries);
            },
            (err) => {
                console.log(err);
            }
        );
    }, []);

    return (
        <PaperProvider theme={Theme}>
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

                    <Button
                        mode="outlined"
                        onPress={() => checkInput()}
                    >
                        Save
                    </Button>
                    <Button
                        style={{marginTop: "70%"}}
                        mode="outlined"
                        onPress={() => props.toggleAddSessionModalVisibility(false)}
                    >
                        Return
                    </Button>
                </View>
            </SafeAreaView>
        </PaperProvider>
    )
}

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

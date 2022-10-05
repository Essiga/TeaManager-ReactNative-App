import {Text, View} from '../components/Themed';
import {IAddSessionModalProps} from "./api/IAddSessionModalProps";
import {Button, TextInput} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import {useEffect, useState} from "react";
import {Tea, TeaApi, TeaType, Vessel, VesselApi} from "../openAPI";

export function AddSessionModal(props: IAddSessionModalProps) {
    let defaultVessel: Vessel = {
        name: "name",
        capacity: 0
    }
    let vesselArray: Vessel[] = [];
    const [showDropDown, setShowDropDown] = useState(false);
    const [vessels, setVessels] = useState(vesselArray);
    const [selectedVessel, setSelectedVessel] = useState();

    let vesselsDropDown: any = [];

    useEffect(() => {


            let vesselApi = new VesselApi();

            vesselApi.viewAllVessels().then((data) => {
                console.log(data.data);
                setVessels(data.data as Vessel[]);
                for (let i = 0; i < data.data.length; i++) {
                    vesselsDropDown.push({label: data.data[i].name + "(" + data.data[i].capacity + "ml)", value: data.data[i].id})
                }
            }, (err) => {
                console.log(err);
            })
        });


    return (
        <View>

            <Text>Add Session</Text>
            <TextInput
                label="Amount"
                // onChangeText={text => setYear(parseInt(text))}
            />
            <TextInput
                label="Date"
                // onChangeText={text => setYear(parseInt(text))}
            />
            <DropDown
                label={"Vessel"}
                visible={showDropDown}
                dropDownStyle={{width: 140, top: 80,}}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={selectedVessel}
                setValue={setSelectedVessel}
                list={vesselsDropDown}
                inputProps={{
                    right: <TextInput.Icon icon={"arrow-down-drop-circle"}/>
                }}
            />
            <Button style={{marginTop: "100%"}} mode="outlined" onPress={() => props.toggleAddSessionModalVisibility(false)}> return </Button>


        </View>

    )
}
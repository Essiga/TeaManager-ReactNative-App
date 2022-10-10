import {Alert, StyleSheet, SafeAreaView} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";

import {View} from '../components/Themed';
import {useState} from "react";
import {TeaApi, Tea, TeaType} from "../openAPI";

let teaApi = new TeaApi();

type TeaTypeDropDownEntry = {
    label: string,
    value: TeaType
}

export default function AddNewTea(props: any) {
    const [newTea, setNewTea] = useState("");
    const [teaType, setTeaType] = useState(TeaType.Green);
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [link, setLink] = useState("");
    const [vendor, setVendor] = useState("");
    const [year, setYear] = useState(0);
    const [showDropDown, setShowDropDown] = useState(false);

    const teaTypeDropDown: TeaTypeDropDownEntry[] = [
        {label: "Green", value: TeaType.Green},
        {label: "Black", value: TeaType.Black},
        {label: 'Oolong', value: TeaType.Oolong},
        {label: 'Sheng', value: TeaType.Sheng},
        {label: 'Shou', value: TeaType.Shou},
        {label: 'Yellow', value: TeaType.Yellow},
        {label: 'White', value: TeaType.White},
        {label: 'Heicha', value: TeaType.Heicha}
    ];

    function checkInput() {
        if (!newTea.trim()) {
            alert('Add Tea Name');
            return;
        }

        sendData(newTea, teaType, amount, price, link, vendor, year);
    }

    function sendData(newTea: string, teaType: TeaType, amount: number, price: number, link: string, vendor: string, year: number) {
        let tea: Tea = {
            name: newTea,
            type: teaType,
            amount: amount,
            price: price,
            link: link,
            vendor: vendor,
            year: year
        };

        teaApi.addTea(tea).then((response) => {
            Alert.alert(response.data);
        }, (err) => {
            console.log(err);
        })
    }

    function clearData() {
        setNewTea('');
        //setTeaType('');
        setAmount(0);
        setPrice(0);
        setLink('');
        setVendor('');
        setYear(0);
    }

    return (
        <SafeAreaView style={styles.dropDown}>
            <TextInput
                label="Tea name"
                value={newTea}
                onChangeText={text => setNewTea(text)}
            />

            <DropDown
                label={"Tea type"}
                visible={showDropDown}
                dropDownStyle={{width: 140, top: 80,}}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={teaType}
                setValue={setTeaType}
                list={teaTypeDropDown}
                inputProps={{
                    right: <TextInput.Icon icon={"arrow-down-drop-circle"}/>
                }}
            />
            <TextInput
                label="Amount"
                value={amount.toString()}
                onChangeText={text => setAmount(parseInt(text))}
            />
            <TextInput
                label="Price"
                value={price.toString()}
                onChangeText={text => setPrice(parseInt(text))}
            />
            <TextInput
                label="Webpage"
                value={link}
                onChangeText={text => setLink(text)}
            />
            <TextInput
                label="Vendor"
                value={vendor}
                onChangeText={text => setVendor(text)}
            />
            <TextInput
                label="Year"
                value={year.toString()}
                onChangeText={text => setYear(parseInt(text))}
            />

            <View style={styles.container}>
                <View style={styles.button}>
                    <Button icon="tea" mode="contained"
                            onPress={() => {
                                //sendData(newTea, teaType, parseInt(amount), parseInt(price), link, vendor, parseInt(year));
                                checkInput();
                            }}>
                        Add Tea
                    </Button>
                    <Button icon="cancel" mode="contained" onPress={() => clearData()}>Cancel</Button>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        padding: 50,

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
    }
});

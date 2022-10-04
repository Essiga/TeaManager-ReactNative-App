import {Alert, ScrollView, StyleSheet, Modal, SafeAreaView} from 'react-native';
import {Button, DefaultTheme, List, ListItemProps, TextInput, Provider as PaperProvider} from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";

import {Text, View} from '../components/Themed';
import {useEffect, useState} from "react";
import {RootTabScreenProps} from "../types";
import {AddTeaRequest, TeaApi} from "../openAPI";

export enum TeaType {
    Green = 'Green',
    Black = 'Black',
    Oolong = 'Oolong',
    Sheng = 'Sheng',
    Shou = 'Shou',
    Yellow = 'Yellow',
    White = 'White',
    Heicha = 'Heicha'
};
export type Tea = {
    id: string
    name: string
    type: TeaType
    amount: number
    link: string | null
    vendor: string | null
    year: number | null
}

export default function AddNewTea({navigation}: RootTabScreenProps<'NewTea'>) {
    const [newTea, setNewTea] = useState("");
    const [teaType, setTeaType] = useState("")
    const [amount, setAmount] = useState("");
    const [link, setLink] = useState("");
    const [vendor, setVendor] = useState("");
    const [year, setYear] = useState("");
    const [showDropDown, setShowDropDown] = useState(false);
    const teaTypeDropDown = [{label: "Green", value: "Green"}, {label: "Black", value: "Black"}, {
        label: 'Oolong',
        value: 'Oolong'
    },
        {label: 'Sheng', value: 'Sheng'}, {label: 'Shou', value: 'Shou'}, {
            label: 'Yellow',
            value: 'Yellow'
        }, {label: 'White', value: 'White'}, {label: 'Heicha', value: 'Heicha'}]

    const theme = {
        ...DefaultTheme,
        roundness: 4,
        version: 3,
        elevation: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: '#006400',
            secondary: '#f1c40f',
            tertiary: '#a1b2c3',
        },
    };


    function sendData(newTea: string, teaType: string, amount: number, link: string, vendor: string, year: number) {
        let tea = {
            name: newTea,
            type: teaType,
            amount: amount,
            link: link,
            vendor: vendor,
            year: year
        };
        let teaApi = new TeaApi();
        console.log(tea);
        teaApi.addTea(tea as AddTeaRequest).then((response) => {
            Alert.alert("Tea successfully added")
        }, (err) => {
            console.log(err);
        })



    }

    function clearData() {
        setNewTea('');
        setTeaType('');
        setAmount('');
        setLink('');
        setVendor('');
        setYear('');
    }

    return (
        <PaperProvider theme={theme}>
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
                    value={amount}
                    onChangeText={text => setAmount(text)}
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
                    value={year}
                    onChangeText={text => setYear(text)}
                />

                <View style={styles.container}>
                    <View style={styles.button}>
                        <Button icon="tea" mode="contained"
                                onPress={() => {
                                    sendData(newTea, teaType, parseInt(amount), link, vendor, parseInt(year));
                                }}>
                            Add Tea
                        </Button>
                        <Button icon="cancel" mode="contained" onPress={() => clearData()}>Cancel</Button>
                    </View>
                </View>
            </SafeAreaView>
        </PaperProvider>
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

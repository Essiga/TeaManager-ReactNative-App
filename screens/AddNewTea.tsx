import {Alert, ScrollView, StyleSheet, Modal, SafeAreaView} from 'react-native';
import {Button, DefaultTheme, List, ListItemProps, TextInput, Provider as PaperProvider} from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";

import {Text, View} from '../components/Themed';
import {useEffect, useState} from "react";
import {RootTabScreenProps} from "../types";
import { TeaApi, Tea, TeaType} from "../openAPI";


export default function AddNewTea({navigation}: RootTabScreenProps<'NewTea'>) {
    const [newTea, setNewTea] = useState("");
    const [teaType, setTeaType] = useState(TeaType.Green);
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [link, setLink] = useState("");
    const [vendor, setVendor] = useState("");
    const [year, setYear] = useState(0);
    const [showDropDown, setShowDropDown] = useState(false);
    const teaTypeDropDown = [{label: "Green", value: TeaType.Green}, {label: "Black", value: TeaType.Black}, {
        label: 'Oolong',
        value: TeaType.Oolong
    },
        {label: 'Sheng', value: TeaType.Sheng}, {label: 'Shou', value: TeaType.Shou}, {
            label: 'Yellow',
            value: TeaType.Yellow
        }, {label: 'White', value: TeaType.White}, {label: 'Heicha', value: TeaType.Heicha}]

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

    function checkInput (){
        if (!newTea.trim()){
            alert('Add Tea Name');
            return;
        }

        sendData(newTea, teaType, amount, price, link, vendor, year);
    }

    function sendData(newTea: string, teaType: TeaType, amount: number, price: number, link: string, vendor: string, year: number) {
        let tea:Tea = {
            name: newTea,
            type: teaType,
            amount: amount,
            price: price,
            link: link,
            vendor: vendor,
            year: year
        };
        let teaApi = new TeaApi();
        console.log(tea);
        teaApi.addTea(tea).then((response) => {
            Alert.alert("Tea successfully added")
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

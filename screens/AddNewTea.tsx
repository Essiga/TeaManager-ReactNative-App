import {Alert, ScrollView, StyleSheet, Modal} from 'react-native';
import {Button, List, ListItemProps, TextInput} from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";

import {Text, View} from '../components/Themed';
import {useEffect, useState} from "react";
import {RootTabScreenProps} from "../types";

enum TeaType {
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
    const [teaType, setTeaType] = useState( "");
    const [subType, setSubType] = useState("");
    const [currentPrice, setCurrentPrice] = useState("");
    const [amount, setAmount] = useState("");
    const [link, setLink] = useState("");
    const [vendor, setVendor] = useState("");
    const [year, setYear] = useState("");
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
    const teaTypeDropDown =[{label:"Green", value: "Green"}, {label: "Black", value: "Black"}, {label: 'Oolong', value: 'Oolong'}, {label: 'Sheng',value: 'Sheng'}, {label: 'Shou', value: 'Shou'}]

    return (
        <View>
            <Text>Add new tea view </Text>
            <TextInput
                label="Tea name"
                value={newTea}
                onChangeText={text => setNewTea(text)}
            />
            <DropDown
                label={"TeaType"}
                //mode={"outlined"}
                visible={showMultiSelectDropDown}
                showDropDown={() => setShowMultiSelectDropDown(true)}
                onDismiss={() => setShowMultiSelectDropDown(false)}
                list={teaTypeDropDown}
                setValue={setTeaType}
                value={teaType}
                inputProps={{

                    right:  <TextInput.Icon  icon="arrow-down-drop-circle"  />, // arrow-up-drop-circle after press

                }}
            />
            <TextInput
                label="Subtype"
                value={subType}
                onChangeText={text => setSubType(text)}
            />
            <TextInput
                label="current price"
                value={currentPrice}
                onChangeText={text => setCurrentPrice(text)}
            />
            <TextInput
                label="amount"
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
                    <Button icon="tea" mode="contained" onPress={() => {console.log("pressed")}}>Add Tea</Button>
                    <Button icon="cancel" mode="outlined">Cancel</Button>
                </View>
            </View>
        </View>
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
        justifyContent: 'space-between'

    }
});

import {Alert, SafeAreaView, StyleSheet, View} from "react-native";
import {IUpdateTeaModalProps} from "./api/IUpdateTeaModalProps";
import {Button, TextInput, Text} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import {useState} from "react";
import {Tea, TeaApi, TeaType} from "../openAPI";

type TeaTypeDropDownEntry = {
    label: string,
    value: TeaType
}

let teaApi = new TeaApi();

export function UpdateTeaModal(props: IUpdateTeaModalProps) {

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
        }
    });

    function updateData() {
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

        props.toggleUpdateTeaModalVisibility();
    }

    return (
        <SafeAreaView style={styles.dropDown}>
            <Text variant="titleLarge"
                  style={{paddingStart: 20, paddingEnd: 20, paddingBottom: 10, textAlign: "center"}}>Update
                Tea </Text>

            <TextInput
                label="Tea name"
                value={props.tea.name}
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
                value={props.tea.amount.toString()}
                onChangeText={text => setAmount(parseFloat(text))}
            />
            <TextInput
                label="price"
                value={props.tea.price?.toString()}
                onChangeText={text => setPrice(parseFloat(text))}
            />
            <TextInput
                label="Webpage"
                value={props.tea.link}
                onChangeText={text => setLink(text)}
            />
            <TextInput
                label="Vendor"
                value={props.tea.vendor}
                onChangeText={text => setVendor(text)}
            />
            <TextInput
                label="Year"
                value={props.tea.year?.toString()}
                onChangeText={text => setYear(parseInt(text))}
            />
            <View style={styles.container}>
                <View style={styles.button}>
                    <Button icon="tea" mode="contained"
                            onPress={() => {
                                updateData();
                            }}>
                        Update Tea
                    </Button>
                    <Button mode="outlined" onPress={() => props.toggleUpdateTeaModalVisibility()}> return </Button>
                </View>
            </View>
        </SafeAreaView>
    );

}
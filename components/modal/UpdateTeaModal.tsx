import {Alert, SafeAreaView, StyleSheet, View} from "react-native";
import {Provider as PaperProvider} from 'react-native-paper';
import {IUpdateTeaModalProps} from "./api/IUpdateTeaModalProps";
import {Button, TextInput, Text} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import {useState} from "react";
import {Tea, TeaApi, TeaType} from "../../openAPI";
import Theme from "../../constants/Theme";
import {RootStackScreenProps} from "../../types";

type TeaTypeDropDownEntry = {
    label: string,
    value: TeaType
}

let teaApi = new TeaApi();

export function UpdateTeaModal(navProps: RootStackScreenProps<'UpdateTeaModal'>) {

    const props: IUpdateTeaModalProps = navProps.route.params;

    const [updateTea, setUpdateTea] = useState(props.tea.name);
    const [updateTeaType, setTeaType] = useState(TeaType.Green);
    const [updateAmount, setUpdateAmount] = useState(props.tea.amount);
    const [updatePrice, setUpdatePrice] = useState(props.tea.price);
    const [updateLink, setUpdateLink] = useState(props.tea.link);
    const [updateVendor, setUpdateVendor] = useState(props.tea.vendor);
    const [updateYear, setUpdateYear] = useState(props.tea.year);
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

    function updateData() {
        let tea: Tea = {
            id: props.tea.id,
            name: updateTea,
            type: updateTeaType,
            amount: updateAmount,
            price: updatePrice,
            link: updateLink,
            vendor: updateVendor,
            year: updateYear
        };

        teaApi.updateTea(tea).then((response) => {

            props.updateTea(tea);
            navProps.navigation.navigate("DetailedTeaModal", {
                tea: tea,
                toggleTeaModalVisibility: () => {
                },
                toggleAddSessionModalVisibility: () => {
                }
            });

            Alert.alert("Tea successfully updated");

        }, (err) => {
            console.log(err);
        })
    }

    return (
        <PaperProvider theme={Theme}>
            <SafeAreaView style={styles.dropDown}>
                <Text
                    variant="titleLarge"
                    style={{paddingStart: 20, paddingEnd: 20, paddingBottom: 10, textAlign: "center"}}
                >
                    Update Tea
                </Text>

                <TextInput
                    label={"old tea name: " + props.tea.name}
                    value={updateTea}
                    onChangeText={text => setUpdateTea(text)}
                />

                <DropDown
                    label={"Tea type"}
                    visible={showDropDown}
                    dropDownStyle={{width: 140, top: 80,}}
                    showDropDown={() => setShowDropDown(true)}
                    onDismiss={() => setShowDropDown(false)}
                    value={updateTeaType}
                    setValue={setTeaType}
                    list={teaTypeDropDown}
                    inputProps={{
                        right: <TextInput.Icon icon={"arrow-down-drop-circle"}/>
                    }}
                />
                <TextInput
                    label={"old amount " + props.tea.amount.toString()}
                    value={updateAmount.toString()}
                    onChangeText={text => setUpdateAmount(parseFloat(text))}
                />
                <TextInput
                    label={"old price: " + props.tea.price?.toString()}
                    value={updatePrice?.toString()}
                    onChangeText={text => setUpdatePrice(parseFloat(text))}
                />
                <TextInput
                    label={"old Link: " + props.tea.link}
                    value={updateLink}
                    onChangeText={text => setUpdateLink(text)}
                />
                <TextInput
                    label={"old vendor: " + props.tea.vendor}
                    value={updateVendor}
                    onChangeText={text => setUpdateVendor(text)}
                />
                <TextInput
                    label={"old Year: " + props.tea.year?.toString()}
                    value={updateYear?.toString()}
                    onChangeText={text => setUpdateYear(parseFloat(text))}
                />
                <View style={styles.container}>
                    <View style={styles.button}>
                        <Button
                            icon="tea"
                            mode="contained"
                            onPress={() => {
                                updateData();
                            }}
                        >
                            Update Tea
                        </Button>
                        <Button mode="outlined"
                                onPress={() => props.toggleUpdateTeaModalVisibility(true)}> return </Button>
                    </View>
                </View>
            </SafeAreaView>
        </PaperProvider>
    );
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
    }
});

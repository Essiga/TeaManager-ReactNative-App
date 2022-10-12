import {Linking, Modal, StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-paper";
import {ITeaModalProps} from "./api/ITeaModalProps";
import {Tea, TeaType} from "../openAPI";
import { useState } from "react";
import {UpdateTeaModal} from "./UpdateTeaModal";

export function DetailedTeaModal(props: ITeaModalProps) {
    const [updateTeaVisible, setUpdateTeaVisible] = useState(false);
    const [tea, setTea] = useState({
        id: "0",
        name: "name",
        type: TeaType.Green,
        amount: 1,
        price: 2,
        link: "www.google.com",
        vendor: "vendor",
        year: 1970
    } as Tea);
    function toggleUpdateTeaModalVisibility() {
        props.setUpdateTeaVisible(false);
        props.toggleTeaModalVisibility(true);
    }

    function showUpdateTea(tea: Tea) {
        console.log(tea)
        setUpdateTeaVisible(true);
        setTea(tea);
    }

    return (
        <View>
            <Text
                variant="titleLarge"
                style={styles.title}
            >
                {props.tea.name}
            </Text>

            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.propsStyle} variant="bodyLarge">Amount:</Text>
                    <Text style={styles.propsStyle} variant="bodyLarge">Price/g:</Text>
                    <Text style={styles.propsStyle} variant="bodyLarge">Year:</Text>
                    <Text style={styles.propsStyle} variant="bodyLarge">Vendor:</Text>
                    <Text style={styles.propsStyle} variant="bodyLarge">Website:</Text>
                    <Text style={styles.propsStyle} variant="bodyLarge">Type:</Text>

                </View>
                <View style={styles.item}>
                    <Text style={styles.propsStyle} variant="bodyLarge">{props.tea.amount}g</Text>
                    <Text style={styles.propsStyle} variant="bodyLarge">{props.tea.price} USD</Text>
                    <Text style={styles.propsStyle} variant="bodyLarge">{props.tea.year}</Text>
                    <Text style={styles.propsStyle} variant="bodyLarge">{props.tea.vendor}</Text>
                    <Text
                        style={styles.linkText}
                        variant="bodyLarge"
                        onPress={() => {
                            if (props.tea.link != null) {
                                Linking
                                    .openURL(props.tea.link)
                                    .then(/* Empty promise handling */);
                            }
                        }}
                    >
                        Open link
                    </Text>
                    <Text style={styles.propsStyle} variant="bodyLarge">{props.tea.type}</Text>
                </View>

            </View>

            <View style={styles.button}>
                <Button  mode="outlined" onPress={() => {
                    props.toggleTeaModalVisibility(false);
                    props.toggleAddSessionModalVisibility(true);
                }}> Start Session </Button>
                <Button mode="outlined" onPress={() => showUpdateTea(props.tea)}> Update Tea</Button>
            </View>
            <Button
                style={{marginTop: "100%"}}
                mode="outlined"
                onPress={() => props.toggleTeaModalVisibility(false)}
            >
                Return
            </Button>

            <Modal visible={updateTeaVisible} onDismiss={() => {setUpdateTeaVisible(false)}}>
                <UpdateTeaModal toggleUpdateTeaModalVisibility={toggleUpdateTeaModalVisibility} tea={tea}/>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
        width: '50%'
    },
    propsStyle: {
        paddingStart: 20,
        paddingTop: 5
    },
    linkText: {
        paddingStart: 20,
        paddingTop: 5,
        color: 'blue'
    },
    title: {
        paddingStart: 20,
        paddingEnd: 20,
        paddingBottom: 10,
        textAlign: "center"
    },
    button: {
        flexDirection: "row",
        paddingTop: 20,
        justifyContent: 'space-between',
        alignItems: "center",
        paddingLeft: 50,
        paddingEnd: 50,
    },
});
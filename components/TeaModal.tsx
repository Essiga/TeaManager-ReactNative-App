import {Linking, Modal, StyleSheet, View} from "react-native";
import {Button, List, Text} from "react-native-paper";
import {ITeaModalProps} from "./api/ITeaModalProps";
import {useState} from "react";
import {Tea, TeaType} from "../openAPI";
import {UpdateTeaModal} from "./UpdateTeaModal";

export function TeaModal(props: ITeaModalProps) {
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
        setUpdateTeaVisible(false);
        props.toggleTeaModalVisibility(true);
    }

    function showUpdateTea(tea: Tea) {
        console.log(tea)
        setUpdateTeaVisible(true);
        setTea(tea);
    }

    const propsStyle = {

        paddingStart: 20,
        paddingTop: 5
    }

    const linkText = {

        paddingStart: 20,
        paddingTop: 5,
        color: 'blue'
    }


    const styles = StyleSheet.create({
        container: {

            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start' // if you want to fill rows left to right
        },
        item: {
            width: '50%' // is 50% of container width
        },
        button: {
            flexDirection: "row",
            paddingTop: 20,
            justifyContent: 'space-between',
            alignItems: "center",
            paddingLeft: 50,
            paddingEnd: 50,
        },

    })
    //console.log("The name: ",props.detailTea.name)
    return (
        <View>
            <Text variant="titleLarge"
                  style={{paddingStart: 20, paddingEnd: 20, paddingBottom: 10, textAlign: "center"}}>
                {props.tea.name}
            </Text>
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={propsStyle} variant="bodyLarge">Amount:</Text>
                    <Text style={propsStyle} variant="bodyLarge">Price/g:</Text>
                    <Text style={propsStyle} variant="bodyLarge">Year:</Text>
                    <Text style={propsStyle} variant="bodyLarge">Vendor:</Text>
                    <Text style={propsStyle} variant="bodyLarge">Website:</Text>
                    <Text style={propsStyle} variant="bodyLarge">Type:</Text>

                </View>
                <View style={styles.item}>
                    <Text style={propsStyle} variant="bodyLarge">{props.tea.amount}g</Text>
                    <Text style={propsStyle} variant="bodyLarge">{props.tea.price} USD</Text>
                    <Text style={propsStyle} variant="bodyLarge">{props.tea.year}</Text>
                    <Text style={propsStyle} variant="bodyLarge">{props.tea.vendor}</Text>
                    <Text style={linkText} variant="bodyLarge" onPress={() => {
                        if (props.tea.link != null) {
                            let url = props.tea.link;
                            Linking.openURL(url);
                        }
                    }}>open link</Text>
                    <Text style={propsStyle} variant="bodyLarge">{props.tea.type}</Text>
                </View>

            </View>
            <View style={styles.button}>
                <Button  mode="outlined" onPress={() => {
                    props.toggleTeaModalVisibility(false);
                    props.toggleAddSessionModalVisibility(true);
                }}> Start Session </Button>
                <Button mode="outlined" onPress={() => showUpdateTea(props.tea)}> Update Tea</Button>
            </View>
            <Button style={{marginTop: "100%"}} mode="outlined"
                    onPress={() => props.toggleTeaModalVisibility(false)}> return </Button>

            <Modal visible={updateTeaVisible} onDismiss={() => {setUpdateTeaVisible(false)}}>
                <UpdateTeaModal toggleUpdateTeaModalVisibility={toggleUpdateTeaModalVisibility} tea={tea}/>
            </Modal>

        </View>

    );
}
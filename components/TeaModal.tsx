import {Linking, Modal, StyleSheet, View} from "react-native";
import {Button, List, Text} from "react-native-paper";
import {ITeaModalProps} from "./api/ITeaModalProps";
import {useState} from "react";
import {EditTeaModal} from "./EditTeaModal";
import {Tea, TeaType} from "../openAPI";

export function TeaModal(props: ITeaModalProps) {
    const [editTeaVisible, setEditTeaVisible] = useState(false);
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

    const propsStyle = {

        paddingStart: 20,
        paddingTop: 5
    }

    const linkText = {

        paddingStart: 20,
        paddingTop: 5,
        color: 'blue'
    }

    function toggleEditTeaModalVisibility() {
        setEditTeaVisible(false);
        props.toggleTeaModalVisibility();
    }

    function showEditTea(tea: Tea) {
        setEditTeaVisible(true);
        setTea(tea);
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
                    <Text style={propsStyle} variant="bodyLarge">Price:</Text>
                    <Text style={propsStyle} variant="bodyLarge">Year:</Text>
                    <Text style={propsStyle} variant="bodyLarge">Vendor:</Text>
                    <Text style={propsStyle} variant="bodyLarge">Website:</Text>
                    <Text style={propsStyle} variant="bodyLarge">Type:</Text>

                </View>
                <View style={styles.item}>
                    <Text style={propsStyle} variant="bodyLarge">{props.tea.amount}g</Text>
                    <Text style={propsStyle} variant="bodyLarge">420.00 USD</Text>
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
                <Button mode="outlined" onPress={() => props.toggleTeaModalVisibility()}> return </Button>
                <Button mode="outlined" onPress={() => showEditTea(props.tea)}> edit Tea </Button>
            </View>
            <Modal visible={editTeaVisible} onDismiss={() => {setEditTeaVisible(false)}}>
                <EditTeaModal toggleEditTeaModalVisibility={toggleEditTeaModalVisibility} tea={tea}/>
            </Modal>

        </View>

    );


}
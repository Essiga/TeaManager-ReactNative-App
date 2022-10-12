import {Linking, Modal, StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-paper";
import {ITeaModalProps} from "./api/ITeaModalProps";
import {Tea, TeaType} from "../openAPI";
import {useState} from "react";
import {UpdateTeaModal} from "./UpdateTeaModal";
import {ISessionModalProps} from "./api/ISessionModalProps";

export function DetailedSessionModal(props: ISessionModalProps) {
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
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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
                {props.session.teaName}
            </Text>

            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.propsStyle} variant="bodyLarge">Amount:</Text>
                    <Text style={styles.propsStyle} variant="bodyLarge">Session Price:</Text>
                    <Text style={styles.propsStyle} variant="bodyLarge">Date:</Text>

                </View>
                <View style={styles.item}>
                    <Text style={styles.propsStyle} variant="bodyLarge">{props.session.amount}g</Text>
                    <Text style={styles.propsStyle} variant="bodyLarge">{props.session.price} USD</Text>
                    <Text style={styles.propsStyle} variant="bodyLarge">{new Date(props.session.date).toLocaleString()}</Text>
                </View>

            </View>

            {/*<View style={styles.button}>*/}
            {/*    <Button mode="outlined" onPress={() => {*/}
            {/*        props.toggleTeaModalVisibility(false);*/}
            {/*        props.toggleAddSessionModalVisibility(true);*/}
            {/*    }}> Start Session </Button>*/}
            {/*    <Button mode="outlined" onPress={() => showUpdateTea(props.tea)}> Update Tea</Button>*/}
            {/*</View>*/}
            {/*<Button*/}
            {/*    style={{marginTop: "100%"}}*/}
            {/*    mode="outlined"*/}
            {/*    onPress={() => props.toggleTeaModalVisibility(false)}*/}
            {/*>*/}
            {/*    Return*/}
            {/*</Button>*/}

            {/*<Modal visible={updateTeaVisible} onDismiss={() => {*/}
            {/*    setUpdateTeaVisible(false)*/}
            {/*}}>*/}
            {/*    <UpdateTeaModal toggleUpdateTeaModalVisibility={toggleUpdateTeaModalVisibility} tea={tea}/>*/}
            {/*</Modal>*/}
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

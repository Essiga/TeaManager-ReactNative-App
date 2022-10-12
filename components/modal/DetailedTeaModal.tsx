import {Linking, Modal, StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-paper";
import {ITeaModalProps} from "../api/ITeaModalProps";
import {Tea, TeaApi, TeaType} from "../../openAPI";
import {useState} from "react";
import {UpdateTeaModal} from "./UpdateTeaModal";

// let teaApi = new TeaApi();

export function DetailedTeaModal(props: any) {

    const [updateTeaVisible, setUpdateTeaVisible] = useState(false);
    const [tea, setTea] = useState({
        id: props.tea.id,
        name: props.tea.name,
        type: props.tea.type,
        amount: props.tea.amount,
        price: props.tea.price,
        link: props.tea.link,
        vendor: props.tea.vendor,
        year: props.tea.year
    } as Tea);

    function toggleUpdateTeaModalVisibility() {
        setUpdateTeaVisible(false);
        props.toggleTeaModalVisibility(true);
    }

    function showUpdateTea(tea: Tea) {
        setUpdateTeaVisible(true);
        setTea(tea);
    }

    function updateTea(tea: Tea) {
        if (tea.id != null) {
            // teaApi.getTeaById(tea.id).then((data) => {
            //     setTea(data as unknown as Tea)
            // });
            //props.tea = tea;

            setTea(tea);
        }
    }

    return (
        <View>
            <Text
                variant="titleLarge"
                style={styles.title}
            >
                {tea.name}
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
                    <Text style={styles.propsStyle} variant="bodyLarge">{tea.amount}g</Text>
                    <Text style={styles.propsStyle} variant="bodyLarge">{tea.price} USD</Text>
                    <Text style={styles.propsStyle} variant="bodyLarge">{tea.year}</Text>
                    <Text style={styles.propsStyle} variant="bodyLarge">{tea.vendor}</Text>
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
                    <Text style={styles.propsStyle} variant="bodyLarge">{tea.type}</Text>
                </View>
            </View>

            <View style={styles.button}>
                <Button
                    mode="outlined"
                    onPress={() => {
                        props.toggleTeaModalVisibility(false);
                        props.toggleAddSessionModalVisibility(true);
                    }}
                >
                    Start Session
                </Button>
                <Button
                    mode="outlined"
                    onPress={() => showUpdateTea(tea)}
                >
                    Update Tea
                </Button>
            </View>

            <Button
                style={{marginTop: "100%"}}
                mode="outlined"
                onPress={() => props.toggleTeaModalVisibility(false)}
            >
                Return
            </Button>

            <Modal
                visible={updateTeaVisible}
                onDismiss={() => {
                    setUpdateTeaVisible(false)
                }}
            >
                <UpdateTeaModal
                    toggleUpdateTeaModalVisibility={toggleUpdateTeaModalVisibility}
                    tea={tea}
                    updateTea={updateTea}
                />
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

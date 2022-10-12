import {Linking, StyleSheet, View} from "react-native";
import {Button, Text, Provider as PaperProvider} from 'react-native-paper';
import {ITeaModalProps} from "./api/ITeaModalProps";
import Theme from "../constants/Theme";

export function DetailedTeaModal(props: ITeaModalProps) {

    return (
        <PaperProvider theme={Theme}>
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

                <Button
                    style={{marginTop: 15}}
                    mode="outlined"
                    onPress={() => {
                        props.toggleTeaModalVisibility(false);
                        props.toggleAddSessionModalVisibility(true);
                    }}
                >
                    Start Session
                </Button>
                <Button
                    style={{marginTop: "100%"}}
                    mode="outlined"
                    onPress={() => props.toggleTeaModalVisibility(false)}
                >
                    Return
                </Button>
            </View>
        </PaperProvider>
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
    }
});

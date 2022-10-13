import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {IDetailedSessionModalProps} from "./api/IDetailedSessionModalProps";
import {RootStackScreenProps} from "../../types";

export function DetailedSessionModal(navProps: RootStackScreenProps<"DetailedSessionModal">) {

    const props: IDetailedSessionModalProps = navProps.route.params;

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
                    <Text
                        style={styles.propsStyle}
                        variant="bodyLarge">{new Date(props.session.date).toLocaleString()}
                    </Text>
                </View>
            </View>
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

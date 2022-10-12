import {Modal, ScrollView, StyleSheet} from 'react-native';
import {View} from "react-native";
import {useEffect, useState} from "react";
import {Session, SessionApi} from "../openAPI";
import {ActivityIndicator, List} from "react-native-paper";
import {DetailedSessionModal} from "../components/modal/DetailedSessionModal";
import {RootTabScreenProps} from "../types";

const sessionApi = new SessionApi();

export default function SessionScreen(navProps: RootTabScreenProps<"SessionScreen">) {

    const [sessions, setSessions] = useState([] as Session[]);
    const [isLoading, setLoading] = useState(true);
    const [session, setSession] = useState({
        id: "0",
        teaId: "0",
        teaName: "name",
        amount: 1,
        price: 1,
        date: "1970"
    } as Session);

    useEffect(() => {

        callViewAllSessions();

        return navProps.navigation.addListener('tabPress', () => {
            callViewAllSessions();
        });
    }, [navProps.navigation]);

    function callViewAllSessions() {
        sessionApi.viewAllSessions()
            .then(
                (data) => {
                    console.log(data.data);
                    data.data.sort(function (a, b) {
                        // @ts-ignore
                        return new Date(b.date) - new Date(a.date);
                    });
                    setSessions(data.data as Session[]);
                },
                (err) => {
                    console.log(err);
                }
            )
            .finally(() => {
                setLoading(false);
            });
    }

    return isLoading ? (
        <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="small" color="lightgrey"/>
        </View>
    ) : (
        <View>
            <View style={styles.scrollViewContainer}>
                <ScrollView>
                    {sessions.map((item: Session, i: number) => (
                        <List.Item
                            style={styles.scrollViewContainerItem}
                            titleNumberOfLines={1}
                            key={i}
                            titleEllipsizeMode={"tail"}
                            title={(item?.teaName?.length ?? 0) < 35 ? `${item.teaName}` : `${item.teaName?.substring(0, 32)}...`}
                            description={new Date(item.date).toLocaleString()}
                            left={props => <List.Icon {...props} icon="tea"/>}
                            onPress={() => {
                                setSession(item);

                                navProps.navigation.navigate("DetailedSessionModal", {
                                    session: item
                                })
                            }}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    fabStyle: {
        bottom: 72,
        right: 16,
        position: 'absolute',
        alignItems: 'center'
    },
    scrollViewContainer: {
        height: "100%",
        alignItems: 'center',
        marginHorizontal: 10
    },
    scrollViewContainerItem: {
        minWidth: '100%'
    },
    noVesselsFoundTextContainer: {
        marginTop: "50%",
        height: "100%",
        alignItems: 'center'
    },
});

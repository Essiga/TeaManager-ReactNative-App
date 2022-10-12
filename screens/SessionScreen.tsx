import {StyleSheet} from 'react-native';
import {View} from "react-native";
import {useEffect, useState} from "react";
import {Session, SessionApi} from "../openAPI";
import {ActivityIndicator} from "react-native-paper";
import {DetailedSessionModal} from "../components/modal/DetailedSessionModal";
import {RootTabScreenProps} from "../types";
import SessionViewList from "../components/SessionViewList";

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

        return navProps.navigation.addListener('focus', () => {
            setLoading(true);
            callViewAllSessions();
        });
    }, [navProps.navigation]);

    function callViewAllSessions() {
        sessionApi.viewAllSessions()
            .then(
                (data) => {
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
            <SessionViewList
                sessions={sessions}
                onItemPress={(item) => {
                    setSession(item);

                    navProps.navigation.navigate("DetailedSessionModal", {
                        session: item
                    });
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    }
});

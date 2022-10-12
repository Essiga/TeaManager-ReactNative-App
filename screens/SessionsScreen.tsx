import {Modal, ScrollView, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {useEffect, useState} from "react";
import {Session, SessionApi, Tea, TeaApi, TeaType} from "../openAPI";
import {ActivityIndicator, AnimatedFAB, List} from "react-native-paper";
import {DetailedSessionModal} from "../components/DetailedSessionModal";

const sessionApi = new SessionApi();

export default function SessionsScreen(props: any) {

    const [sessions, setSessions] = useState([] as Session[]);
    const [sessionModalVisible, setSessionModalVisible] = useState(false);
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

        if (props != null && props.navigation != null) {
            return props.navigation.addListener('tabPress', () => {
                callViewAllSessions();
            });
        }
    }, []);

    function callViewAllSessions() {
        sessionApi.viewAllSessions()
            .then(
                (data) => {
                    console.log(data.data);
                    data.data.sort ( function (a, b){
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
                                setSession(sessions[i]);
                                setSessionModalVisible(true);
                            }}
                        />
                    ))}
                </ScrollView>
            </View>
            <Modal
                visible={sessionModalVisible}
                onDismiss={() => setSessionModalVisible(false)}
            >
                <DetailedSessionModal
                    session={session}
                />
            </Modal>
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

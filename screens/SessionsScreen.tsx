import {Modal, ScrollView, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {useEffect, useState} from "react";
import {DetailedTeaModal} from "../components/DetailedTeaModal";
import {Session, SessionApi, Tea, TeaApi, TeaType} from "../openAPI";
import TeaOverviewList from "../components/TeaOverviewList";
import {ActivityIndicator, AnimatedFAB, List} from "react-native-paper";
import AddNewTeaModal from "../components/AddNewTeaModal";
import {AddSessionModal} from "../components/AddSessionModal";

const teaApi = new TeaApi();
const sessionApi = new SessionApi();

export default function SessionsScreen(props: any) {

    const [sessions, setSessions] = useState([] as Session[]);
    const [teaModalVisible, setTeaModalVisible] = useState(false);
    const [addTeaModalVisible, setAddTeaModalVisible] = useState(false);
    const [addSessionModalVisible, setAddSessionModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(true);
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
                            description={item.date}
                            left={props => <List.Icon {...props} icon="tea"/>}
                            onPress={() => {
                                props.onPress(sessions[i]);
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

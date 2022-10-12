import {Modal, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {useEffect, useState} from "react";
import {DetailedTeaModal} from "../components/modal/DetailedTeaModal";
import {Tea, TeaApi, TeaType} from "../openAPI";
import TeaOverviewList from "../components/TeaOverviewList";
import {ActivityIndicator, AnimatedFAB} from "react-native-paper";
import AddNewTeaModal from "../components/modal/AddNewTeaModal";
import {AddSessionModal} from "../components/modal/AddSessionModal";

const teaApi = new TeaApi();

export default function TeaOverviewScreen(props: any) {

    const [teas, setTeas] = useState([] as Tea[]);
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

        callViewAllTeas();

        return props.navigation.addListener('tabPress', () => {
            callViewAllTeas();
        });
    }, []);

    function callViewAllTeas() {
        teaApi.viewAllTeas()
            .then(
                (response) => {
                    setTeas(response.data as Tea[]);
                },
                (err) => {
                    console.log(err);
                }
            )
            .finally(() => {
                setLoading(false);
            });
    }


    function toggleTeaModalVisibility(visibility: boolean) {
        setTeaModalVisible(visibility);
    }

    function toggleAddSessionModalVisibility(visibility: boolean) {
        setAddSessionModalVisible(visibility);
    }

    function toggleAddTeaModalVisibility(visibility: boolean) {
        setAddTeaModalVisible(visibility);
    }

    return isLoading ? (
        <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="small" color="lightgrey"/>
        </View>
    ) : (
        <View>
            <TeaOverviewList
                teas={teas}
                onPress={(tea: Tea) => {
                    setTea(tea);
                    props.navigation.navigate("DetailedTeaModal", {
                        tea: tea,
                        toggleTeaModalVisibility: toggleTeaModalVisibility,
                        toggleAddSessionModalVisibility: toggleAddSessionModalVisibility
                    });
                    // setTeaModalVisible(true)
                }}
            />

            <Modal
                visible={teaModalVisible}
                onDismiss={() => setTeaModalVisible(false)}
            >
                <DetailedTeaModal
                    tea={tea}
                    toggleTeaModalVisibility={toggleTeaModalVisibility}
                    toggleAddSessionModalVisibility={toggleAddSessionModalVisibility}
                />
            </Modal>

            <Modal
                visible={addSessionModalVisible}
                onDismiss={() => setAddSessionModalVisible(false)}
            >
                <AddSessionModal
                    tea={tea}
                    toggleAddSessionModalVisibility={toggleAddSessionModalVisibility}
                />
            </Modal>

            <Modal
                visible={addTeaModalVisible}
                onDismiss={() => setAddTeaModalVisible(false)}
            >
                <AddNewTeaModal
                    tea={tea}
                    toggleAddTeaModalVisibility={toggleAddTeaModalVisibility}
                />
            </Modal>

            <AnimatedFAB
                icon={'plus'}
                label={''}
                extended={false}
                onPress={() => setAddTeaModalVisible(true)}
                visible={true}
                animateFrom={'right'}
                iconMode={'static'}
                style={[styles.fabStyle, {right: 16}]}
            />
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
});

import {Modal, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {useEffect, useState} from "react";
import {TeaModal} from "../components/TeaModal";
import {Tea, TeaApi, TeaType} from "../openAPI";
import TeaOverviewList from "../components/TeaOverviewList";
import {ActivityIndicator, AnimatedFAB} from "react-native-paper";
import AddNewTeaModal from "../components/AddNewTeaModal";
import MyList from "../components/MyList";
import {ActivityIndicator} from "react-native-paper";
import {AddSessionModal} from "../components/AddSessionModal";

const teaApi = new TeaApi();

export default function TeaOverviewScreen(props: any) {

    const [teas, setTeas] = useState([] as Tea[]);
    const [teaModalVisible, setTeaModalVisible] = useState(false);
    const [addTeaModalVisible, setAddTeaModalVisible] = useState(false);
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
    const [isLoading, setLoading] = useState(true);
    const [addSessionModalVisibility, setAddSessionModalVisibility] = useState(false);

    useEffect(() => {

        callViewAllTeas();

        if (props != null && props.navigation != null) {
            return props.navigation.addListener('tabPress', () => {
                callViewAllTeas();
            });
        }
    }, []);

    function callViewAllTeas() {
        teaApi.viewAllTeas()
            .then(
                (data) => {
                    setTeas(data.data as Tea[]);
                },
                (err) => {
                    console.log(err);
                }
            )
            .finally(() => {
                setLoading(false);
            });
    }

    function toggleTeaModalVisibility(visbility: boolean) {
        setTeaModalVisible(false);
    }

    function toggleAddSessionModalVisibility(visbility: boolean) {
        setAddSessionModalVisibility(visbility);
    }

    return isLoading ? (
        <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="small" color="lightgrey"/>
        </View>
    ) : (
        <View>
            <TeaOverviewList
                teas={teas}
                onPress={(tea: Tea, index: number) => {
                    setTea(tea)
                    setTeaModalVisible(true)
                }}
            />

            <Modal
                visible={teaModalVisible}
                onDismiss={() => {
                    setTeaModalVisible(false)
                }}
            >
                <TeaModal toggleTeaModalVisibility={toggleTeaModalVisibility} toggleAddSessionModalVisibility={toggleAddSessionModalVisibility} tea={tea}/>

            </Modal>
            <Modal visible={addSessionModalVisibility} onDismiss={() => {setAddSessionModalVisibility(false)}}>
                <AddSessionModal tea={tea} toggleAddSessionModalVisibility={toggleAddSessionModalVisibility}/>
            </Modal>

            <Modal
                visible={addTeaModalVisible}
                onDismiss={() => {
                    setAddTeaModalVisible(false)
                }}
            >
                <AddNewTeaModal toggleAddTeaModalVisibility={toggleAddTeaModalVisibility} tea={tea}/>
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

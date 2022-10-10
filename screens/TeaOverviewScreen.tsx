import {Modal, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {useEffect, useState} from "react";
import {TeaModal} from "../components/TeaModal";
import {Tea, TeaApi, TeaType} from "../openAPI";
import TeaOverviewList from "../components/TeaOverviewList";
import {ActivityIndicator, AnimatedFAB} from "react-native-paper";
import AddNewTeaModal from "../components/AddNewTeaModal";

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

    const fabStyle = { ["right"]: 16 };

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
            })
    }

    function toggleTeaModalVisibility() {
        setTeaModalVisible(false);
    }

    function toggleAddTeaModalVisibility() {
        setAddTeaModalVisible(false);
    }

    return isLoading ? (
        <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="small" color="lightgrey"/>
        </View>
    ) : (
        <View>
            <TeaOverviewList
                teas={teas}
                onPress={(index: number) => {
                    setTea(teas[index])
                    setTeaModalVisible(true)
                }}
            />

            <Modal
                visible={teaModalVisible}
                onDismiss={() => {
                    setTeaModalVisible(false)
                }}
            >
                <TeaModal toggleTeaModalVisibility={toggleTeaModalVisibility} tea={tea}/>
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
                style={[styles.fabStyle, fabStyle]}
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

import {Modal, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {useEffect, useState} from "react";
import {TeaModal} from "../components/TeaModal";
import {Tea, TeaApi, TeaType} from "../openAPI";
import MyList from "../components/MyList";
import {ActivityIndicator} from "react-native-paper";
import {AddSessionModal} from "../components/AddSessionModal";

const teaApi = new TeaApi();

export default function TeaOverview(props: any) {

    const [teas, setTeas] = useState([] as Tea[]);
    const [teaModalVisible, setTeaModalVisible] = useState(false);
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
            })
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
            <MyList
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
                <TeaModal toggleTeaModalVisibility={toggleTeaModalVisibility} toggleAddSessionModalVisibility={toggleAddSessionModalVisibility} tea={tea}/>

            </Modal>
            <Modal visible={addSessionModalVisibility} onDismiss={() => {setAddSessionModalVisibility(false)}}>
                <AddSessionModal tea={tea} toggleAddSessionModalVisibility={toggleAddSessionModalVisibility}/>
            </Modal>

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

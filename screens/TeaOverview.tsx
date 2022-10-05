import {Modal, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {useEffect, useState} from "react";
import {TeaModal} from "../components/TeaModal";
import {Tea, TeaApi, TeaType} from "../openAPI";
import MyList from "../components/MyList";
import {ActivityIndicator} from "react-native-paper";

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

    function toggleTeaModalVisibility() {
        setTeaModalVisible(false);
    }

    function callViewAllTeas() {
        teaApi.viewAllTeas()
            .then((data) => {
                setTeas(data.data as Tea[]);
            }, (err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {

        callViewAllTeas();

        return props.navigation.addListener('tabPress', () => {
            callViewAllTeas();
        });
    }, [props.navigation])

    return isLoading ? (
        <View style={{flex: 1, padding: 20, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#000"/>
        </View>
    ) : (
        <View>
            <MyList
                teas={teas}
                onPress={(index: any) => {
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

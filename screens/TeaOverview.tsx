import {Alert, ScrollView, StyleSheet, Modal} from 'react-native';
import {List, ListItemProps} from 'react-native-paper';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import axios from "axios";
import {useEffect, useState} from "react";
import {TeaModal} from "../components/TeaModal";


export default function TeaOverview() {
    const axiosInstance = axios.create({baseURL: 'http://172.31.162.103:3000/'});

    const [teas, setTeas] = useState([]);
    const [teaModalVisible, setTeaModalVisible] = useState(false);
    const [detailTea, setDetailTea] = useState([])

    const containerStyle = {backgroundColor: 'white',height: "120%"};

    function teasModalVisible() {
        setTeaModalVisible(false);
    }

    useEffect(() => {
        axiosInstance.get('viewAllTeas')
            .then((response) => {
                setTeas(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    console.log(teas);

    return (
        <View>
            {/*<Text style={styles.title}>Tab Two</Text>*/}
            {/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>*/}
            {/*<EditScreenInfo path="/screens/TabTwoScreen.tsx"/>*/}
            {/*<List.Item*/}
            {/*    title="first Tea"*/}
            {/*    description="first Tea"*/}
            {/*    left={props => <List.Icon {...props} icon="folder" />}*/}
            {/*/>*/}
            <View>
                <ScrollView>
                    <Text>
                        {teas.map((item: any, i: any) => (
                            <List.Item
                                title={item.name}
                                description={item.type}
                                left={props => <List.Icon {...props} icon="tea"/>}
                                onPress={() => {
                                    setDetailTea(teas[i])
                                    setTeaModalVisible(true)
                                }}
                            />
                        ))}
                    </Text>
                </ScrollView>
            </View>
            <Modal visible={teaModalVisible} onDismiss={() => {setTeaModalVisible(false)}}>
                <TeaModal teasModalVisible={teasModalVisible} detailTea={detailTea}></TeaModal>
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

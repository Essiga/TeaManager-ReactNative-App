import {Alert, ScrollView, StyleSheet, Modal} from 'react-native';
import {Divider, List, ListItemProps, Menu} from 'react-native-paper';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import axios from "axios";
import {useEffect, useState} from "react";
import {TeaModal} from "../components/TeaModal";
import {Tea} from "../openAPI";
import {TeaType} from "../openAPI";
import {TeaApi} from "../openAPI";
import React from 'react';


export default function TeaOverview(props: any) {
    const axiosInstance = axios.create({baseURL: 'http://172.31.162.103:3000/api'});
    let teaArray: Tea[] = [];
    const [teas, setTeas] = useState(teaArray);
    const [teaModalVisible, setTeaModalVisible] = useState(false);
    let defaultTea: Tea = {
        id: "0",
        name: "name",
        type: TeaType.Green,
        amount: 1,
        price: 2,
        link: "www.google.com",
        vendor: "vendor",
        year: 1970
    }
    const [tea, setTea] = useState(defaultTea)

    const containerStyle = {backgroundColor: 'white',height: "120%"};

    function toggleTeaModalVisibility() {
        setTeaModalVisible(false);
    }

    useEffect(() => {

        props.navigation.addListener('tabPress', (e: any) => {
            // Prevent default behavior


            let teaApi = new TeaApi();

            teaApi.viewAllTeas().then((data) => {
                console.log(data.data);
                setTeas(data.data as Tea[]);
            }, (err) => {
                console.log(err);
            })
            // Do something manually
            // ...
        });

        // alert("triggered");


        // axiosInstance.get('viewAllTeas')
        //     .then((response) => {
        //         setTeas(response.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }, [props.navigation])

    console.log(teas);

    return (
        <View>
            <ScrollView>
                <Text>
                    {teas.map((item: Tea, i: number) => (
                        <React.Fragment key={i}>
                            <List.Item style={{maxWidth: '100%', width: 800}}
                                       titleNumberOfLines={1}

                                       titleEllipsizeMode={"tail"}
                                       title={item.name.length < 35 ? `${item.name}` : `${item.name.substring(0, 32)}...`}
                                       description={item.type}
                                       left={props => <List.Icon {...props} icon="tea"/>}
                                       onPress={() => {
                                           setTea(teas[i])
                                           setTeaModalVisible(true)
                                       }}
                            />

                            <Divider />
                        </React.Fragment>
                    ))}
                </Text>
            </ScrollView>

            <Modal visible={teaModalVisible} onDismiss={() => {
                setTeaModalVisible(false)
            }}>
                <TeaModal toggleTeaModalVisibility={toggleTeaModalVisibility} tea={tea}></TeaModal>
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

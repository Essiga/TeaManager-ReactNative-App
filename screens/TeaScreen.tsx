import {StyleSheet} from 'react-native';
import {View} from "react-native";
import {useEffect, useState} from "react";
import {DetailedTeaModal} from "../components/modal/DetailedTeaModal";
import {Tea, TeaApi, TeaType} from "../openAPI";
import TeaList from "../components/TeaViewList";
import {ActivityIndicator, AnimatedFAB} from "react-native-paper";
import AddNewTeaModal from "../components/modal/AddNewTeaModal";
import {RootTabScreenProps} from "../types";

const teaApi = new TeaApi();

export default function TeaScreen(navProps: RootTabScreenProps<"TeaScreen">) {

    const [teas, setTeas] = useState([] as Tea[]);
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

        return navProps.navigation.addListener('focus', () => {
            setLoading(true);
            callViewAllTeas();
        });
    }, [navProps.navigation]);

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

    return isLoading ? (
        <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="small" color="lightgrey"/>
        </View>
    ) : (
        <View>
            <TeaList
                teas={teas}
                onItemPress={(tea: Tea) => {
                    setTea(tea);

                    navProps.navigation.navigate("DetailedTeaModal", {
                        tea: tea,
                    });
                }}
            />

            <AnimatedFAB
                icon={'plus'}
                label={''}
                extended={false}
                onPress={() => {
                    navProps.navigation.navigate("AddNewTeaModal", {});
                }}
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

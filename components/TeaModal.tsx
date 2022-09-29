import {StyleSheet, View} from "react-native";
import {Button, List, Text} from "react-native-paper";

export function TeaModal(props: any) {
    const propsStyle ={

        paddingStart: 20,
        paddingTop: 5
    }
    //console.log("The name: ",props.detailTea.name)
    return (
        <View>

            <Text variant="titleLarge" style={{paddingStart: 20, paddingEnd: 20, textAlign: "center"}}>
                {props.detailTea.name}
            </Text>

            <Text style={propsStyle} variant="bodyLarge">Amount:</Text>
            <Text>"test"</Text>
            <Text style={propsStyle} variant="bodyLarge">Price:</Text>
            <Text style={propsStyle} variant="bodyLarge">Year:</Text>
            <Text style={propsStyle} variant="bodyLarge">Vendor:</Text>
            <Text style={propsStyle} variant="bodyLarge">Website:</Text>
            <Text style={propsStyle} variant="bodyLarge">Type:</Text>
            <Button onPress={() => props.teasModalVisible()}> return </Button>
        </View>
    );



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
}
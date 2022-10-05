import {Linking, StyleSheet, View} from "react-native";
import {Button, List, Text} from "react-native-paper";
import {ITeaModalProps} from "./api/ITeaModalProps";

export function TeaModal(props: ITeaModalProps) {
    const propsStyle ={

        paddingStart: 20,
        paddingTop: 5
    }

    const linkText ={

        paddingStart: 20,
        paddingTop: 5,
        color: 'blue'
    }


    const styles = StyleSheet.create({
        container: {

            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start' // if you want to fill rows left to right
        },
        item: {
            width: '50%' // is 50% of container width
        }
    })
    //console.log("The name: ",props.detailTea.name)
    return (
        <View>
            <Text variant="titleLarge" style={{paddingStart: 20, paddingEnd: 20, paddingBottom: 10, textAlign: "center"}}>
                {props.tea.name}
            </Text>
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={propsStyle} variant="bodyLarge">Amount:</Text>
                    <Text style={propsStyle} variant="bodyLarge">Price:</Text>
                    <Text style={propsStyle} variant="bodyLarge">Year:</Text>
                    <Text style={propsStyle} variant="bodyLarge">Vendor:</Text>
                    <Text style={propsStyle} variant="bodyLarge">Website:</Text>
                    <Text style={propsStyle} variant="bodyLarge">Type:</Text>

                </View>
                <View style={styles.item}>
                    <Text style={propsStyle} variant="bodyLarge">{props.tea.amount}g</Text>
                    <Text style={propsStyle} variant="bodyLarge">420.00 USD</Text>
                    <Text style={propsStyle} variant="bodyLarge">{props.tea.year}</Text>
                    <Text style={propsStyle} variant="bodyLarge">{props.tea.vendor}</Text>
                    <Text style={linkText} variant="bodyLarge" onPress={() => {
                        if(props.tea.link != null){
                            let url = props.tea.link;
                            Linking.openURL(url);
                        }
                    }}>open link</Text>
                    <Text style={propsStyle} variant="bodyLarge">{props.tea.type}</Text>
                </View>

            </View>
            <Button style={{marginTop: 15}} mode="outlined" onPress={() => {
                props.toggleTeaModalVisibility(false);
                props.toggleAddSessionModalVisibility(true);
            }}> Start Session </Button>
            <Button style={{marginTop: "100%"}} mode="outlined" onPress={() => props.toggleTeaModalVisibility(false)}> return </Button>
        </View>

    );
}
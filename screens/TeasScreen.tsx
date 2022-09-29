import {StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {List} from "react-native-paper";

export default function TeasScreen({navigation}: RootTabScreenProps<'Tea'>) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tea Overview</Text>


            <List.Item title="2022 Yunnan Sourcing Yi Shan Mo Yi Wu Ancient Arbor Raw Pu-erh Tea Cake" description="Item Desc..."  left={props => <List.Icon {...props} icon="folder" />}></List.Item>
            {/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>*/}
            {/*<EditScreenInfo path="/screens/TeasScreen.tsx"/>*/}
            <List.Item
                title="First Item"
                description="Item description"
                left={props => <List.Icon {...props} icon="folder" />}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'start',
        // justifyContent: 'center',
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

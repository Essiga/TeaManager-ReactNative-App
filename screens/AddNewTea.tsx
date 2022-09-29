import {Alert, ScrollView, StyleSheet, Modal} from 'react-native';
import {List, ListItemProps, TextInput} from 'react-native-paper';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import axios from "axios";
import {useEffect, useState} from "react";
import {TeaModal} from "../components/TeaModal";
import {RootTabScreenProps} from "../types";

export default function AddNewTea({navigation}: RootTabScreenProps<'NewTea'>){
    const [text, setText] = useState("");

    return(
    <View>
        <Text>Hello add new tea view </Text>
        <TextInput
            label="Tea name"
            value={text}
            onChangeText={text=> setText(text)}
        />
    </View>
    )
}
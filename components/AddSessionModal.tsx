import {Text, View} from '../components/Themed';
import {IAddSessionModalProps} from "./api/IAddSessionModalProps";
import {Button} from "react-native-paper";

export function AddSessionModal(props: IAddSessionModalProps) {
    return (
        <View>
            <Text>Hello</Text>
            <Button style={{marginTop: "100%"}} mode="outlined" onPress={() => props.toggleAddSessionModalVisibility(false)}> return </Button>
        </View>

    )
}
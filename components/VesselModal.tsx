import {useState} from "react";
import {View} from "react-native";
import {Button, TextInput} from "react-native-paper";


export function VesselModal(props: any) {
    const [newVessel, setNewVessel] = useState("");
    const [amount, setAmount] = useState(0);
    const [session, setSession] = useState("");

    function clearData() {
        setNewVessel('');
        setAmount(0);
        setSession('')
    }

    return (
        <View>
            <TextInput
                label="Vessel"
                value={newVessel}
                onChangeText={text => setNewVessel(text)}
            />
            <TextInput
                label="Amount"
                value={amount.toString()}
                onChangeText={text => setAmount(parseInt(text))}
            />

            <TextInput
                label="Session"
                value={session}
                onChangeText={text => setSession(text)}
            />
            <Button onPress={() => props.toggleTeaModalVisibility()}> return </Button>
        </View>
    );

}
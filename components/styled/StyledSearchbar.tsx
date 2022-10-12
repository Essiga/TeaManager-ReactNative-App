import {StyleSheet} from "react-native";
import {Searchbar} from "react-native-paper";
import {IStyledSearchbarProps} from "./api/IStyledSearchbarProps";

export default function StyledSearchbar(props: IStyledSearchbarProps) {
    return (
        <Searchbar
            placeholder={props.placeholder}
            onChangeText={(query: string) => props.onChangeSearch(query)}
            value={props.searchQuery}
            style={styles.searchBar}
            inputStyle={styles.searchBarInput}
            elevation={2}
        />
    );
}

const styles = StyleSheet.create({
    searchBarInput: {
        fontSize: 14
    },
    searchBar: {
        zIndex: 10
    },
});

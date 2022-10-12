import {Tea} from "../openAPI";
import {List, Text} from "react-native-paper";
import {ScrollView, StyleSheet} from "react-native";
import {useState} from "react";
import {View} from "./Themed";
import StyledSearchbar from "./StyledSearchbar";

export default function TeaOverviewList(props: any) {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTeas, setFilteredTeas] = useState(props.teas);

    const onChangeSearch = (query: string) => {

        if (query === "") {
            setFilteredTeas(props.teas);
        } else {
            setFilteredTeas(
                props.teas.filter((filter: Tea) => {
                    const itemData = filter.name ? filter.name.toUpperCase() : ''.toUpperCase();

                    return itemData.indexOf(query.toUpperCase()) > -1;
                })
            );
        }

        setSearchQuery(query);
    };

    const searchBarContent = () => {
        return (
            <StyledSearchbar
                placeholder={"Search"}
                onChangeSearch={(query: string) => onChangeSearch(query)}
                searchQuery={searchQuery}
            />
        );
    }

    return !filteredTeas.length ? (
        <>
            {searchBarContent()}

            <View style={styles.noVesselsFoundTextContainer}>
                <Text>
                    No teas found
                </Text>
            </View>
        </>
    ) : (
        <>
            {searchBarContent()}

            <View style={styles.scrollViewContainer}>
                <ScrollView style={styles.scrollView}>
                    {filteredTeas.map((item: Tea, i: number) => (
                        <List.Item
                            style={styles.scrollViewContainerItem}
                            titleNumberOfLines={1}
                            key={i}
                            titleEllipsizeMode={"tail"}
                            title={item.name.length < 35 ? `${item.name}` : `${item.name.substring(0, 32)}...`}
                            description={item.type}
                            left={props => <List.Icon {...props} icon="leaf"/>}
                            onPress={() => {
                                props.onPress(filteredTeas[i]);
                            }}
                        />
                    ))}
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        marginBottom: 110
    },
    scrollViewContainer: {
        height: "100%",
        alignItems: 'center',
        marginHorizontal: 10,
    },
    scrollViewContainerItem: {
        minWidth: '100%',
        padding: 5
    },
    noVesselsFoundTextContainer: {
        marginTop: "50%",
        height: "100%",
        alignItems: 'center'
    },
});

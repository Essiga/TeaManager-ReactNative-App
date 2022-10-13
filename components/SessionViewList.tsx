import {Session} from "../openAPI";
import {List, Text} from "react-native-paper";
import {ScrollView, StyleSheet} from "react-native";
import {useState} from "react";
import {View} from "react-native";
import StyledSearchbar from "./styled/StyledSearchbar";
import {ISessionViewListProps} from "./api/ISessionViewListProps";

export default function SessionViewList(props: ISessionViewListProps) {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSessions, setFilteredTeas] = useState(props.sessions);

    const onChangeSearch = (query: string) => {

        if (query === "") {
            setFilteredTeas(props.sessions);
        } else {
            setFilteredTeas(
                props.sessions.filter((filter: Session) => {
                    const itemData = filter.teaName ? filter.teaName.toUpperCase() : ''.toUpperCase();

                    return itemData.indexOf(query.toUpperCase()) > -1;
                })
            );
        }

        setSearchQuery(query);
    };

    return (
        <>
            <StyledSearchbar
                placeholder={"Search"}
                onChangeSearch={(query: string) => onChangeSearch(query)}
                searchQuery={searchQuery}
            />

            <View style={styles.scrollViewContainer}>
                <ScrollView>

                    {
                        !filteredSessions.length ? (
                            <View style={styles.noItemsFoundTextContainer}>
                                <Text>
                                    No sessions found
                                </Text>
                            </View>
                        ) : ("")
                    }

                    {filteredSessions.map((item: Session, i: number) => (
                        <List.Item
                            style={styles.scrollViewContainerItem}
                            titleNumberOfLines={1}
                            key={i}
                            titleEllipsizeMode={"tail"}
                            title={(item?.teaName?.length ?? 0) < 35 ? `${item.teaName}` : `${item.teaName?.substring(0, 32)}...`}
                            description={new Date(item.date).toLocaleString()}
                            left={props => <List.Icon {...props} icon="tea"/>}
                            onPress={() => {
                                props.onItemPress(filteredSessions[i]);
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
        marginHorizontal: 10
    },
    scrollViewContainerItem: {
        minWidth: '100%',
        padding: 5
    },
    noItemsFoundTextContainer: {
        marginTop: 100
    },
});

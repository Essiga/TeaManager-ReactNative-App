import {Vessel} from "../openAPI";
import {List, Searchbar, Text} from "react-native-paper";
import {ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {View} from "./Themed";

export default function VesselList(props: any) {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredVessels, setFilteredVessels] = useState(props.vessels);

    const onChangeSearch = (query: string) => {

        if (query === "") {
            setFilteredVessels(props.vessels);
        } else {
            setFilteredVessels(
                props.vessels.filter((filter: Vessel) => {
                    const itemData = filter.name ? filter.name.toUpperCase() : ''.toUpperCase();

                    return itemData.indexOf(query.toUpperCase()) > -1;
                })
            );
        }

        setSearchQuery(query);
    };

    const searchBarContent = () => {
        return (
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
        );
    }

    return !filteredVessels.length ? (
        <>
            {searchBarContent()}

            <View style={styles.noVesselsFoundTextContainer}>
                <Text>
                    No vessels found
                </Text>
            </View>
        </>
    ) : (
        <>
            {searchBarContent()}

            <View style={styles.scrollViewContainer}>
                <ScrollView>
                    {filteredVessels.map((item: Vessel, i: number) => (
                        <List.Item
                            style={styles.scrollViewContainerItem}
                            titleNumberOfLines={1}
                            key={i}
                            titleEllipsizeMode={"tail"}
                            title={item.name.length < 35 ? `${item.name}` : `${item.name.substring(0, 32)}...`}
                            left={_props => <List.Icon {..._props} icon="tea"/>}
                            right={_props => {
                                return (
                                    <TouchableOpacity onPress={() => props.deleteVessel(item.id)}>
                                        <List.Icon {..._props} icon="delete"/>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    ))}
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        height: "100%",
        alignItems: 'center'
    },
    scrollViewContainerItem: {
        minWidth: '100%'
    },
    noVesselsFoundTextContainer: {
        marginTop: "50%",
        height: "100%",
        alignItems: 'center'
    },
});

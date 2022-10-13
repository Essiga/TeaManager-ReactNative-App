import {Vessel} from "../openAPI";
import {List, Text} from "react-native-paper";
import {ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {View} from "react-native";
import StyledSearchbar from "./styled/StyledSearchbar";
import {IVesselViewListProps} from "./api/IVesselViewListProps";

export default function VesselViewList(props: IVesselViewListProps) {

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

    return (
        <>
            <StyledSearchbar
                placeholder={"Search"}
                onChangeSearch={(query: string) => onChangeSearch(query)}
                searchQuery={searchQuery}
            />

            <View style={styles.scrollViewContainer}>
                <ScrollView style={styles.scrollView}>

                    {
                        !filteredVessels.length ? (
                            <View style={styles.noItemsFoundTextContainer}>
                                <Text>
                                    No vessels found
                                </Text>
                            </View>
                        ) : ("")
                    }

                    {filteredVessels.map((item: Vessel, i: number) => (
                        <List.Item
                            style={styles.scrollViewContainerItem}
                            titleNumberOfLines={1}
                            key={i}
                            titleEllipsizeMode={"tail"}
                            title={item.name.length < 35 ? `${item.name}` : `${item.name.substring(0, 32)}...`}
                            description={item.capacity + "ml"}
                            left={_props => <List.Icon {..._props} icon="tea"/>}

                            // TODO:: delete is broken
                            // right={_props => {
                            //     return (
                            //         <TouchableOpacity onPress={() => props.deleteVessel(item.id)}>
                            //             <List.Icon {..._props} icon="delete"/>
                            //         </TouchableOpacity>
                            //     )
                            // }}
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

import {Tea} from "../openAPI";
import {List, Searchbar, Text} from "react-native-paper";
import {ScrollView} from "react-native";
import {useState} from "react";
import {View} from "./Themed";

export default function MyList(props: any) {

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

    const getSearchBar = () => {
        return (
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
        );
    }

    return !filteredTeas.length ? (
        <>
            {getSearchBar()}

            <View style={{marginTop: "50%", height: "100%", alignItems: 'center'}}>
                <Text>
                    No teas found
                </Text>
            </View>
        </>
    ) : (
        <>
            {getSearchBar()}

            <View style={{height: "100%", alignItems: 'center'}}>
                <ScrollView>
                    {filteredTeas.map((item: Tea, i: number) => (
                        <List.Item style={{minWidth: '100%'}}
                                   titleNumberOfLines={1}
                                   key={i}
                                   titleEllipsizeMode={"tail"}
                                   title={item.name.length < 35 ? `${item.name}` : `${item.name.substring(0, 32)}...`}
                                   description={item.type}
                                   left={props => <List.Icon {...props} icon="tea"/>}
                                   onPress={() => {
                                       props.onPress(i);
                                   }}
                        />
                    ))}
                </ScrollView>
            </View>
        </>
    )
}

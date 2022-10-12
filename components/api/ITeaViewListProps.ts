import {Tea} from "../../openAPI";

export interface ITeaViewListProps {
    teas: Tea[];
    onItemPress: (tea: Tea) => void;
}

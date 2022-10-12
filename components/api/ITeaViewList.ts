import {Tea} from "../../openAPI";

export interface ITeaViewList {
    teas: Tea[];
    onItemPress: (tea: Tea) => void;
}

import {Vessel} from "../../openAPI";

export interface IStyledSearchbarProps {
    placeholder: string;
    onChangeSearch: (query: string) => void;
    searchQuery: string;
}

import {Tea} from "../../screens/AddNewTea";

export interface ITeaModalProps {
    tea: Tea;
    toggleTeaModalVisibility: () => void;
}
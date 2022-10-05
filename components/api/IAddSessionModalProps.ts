import {Tea} from "../../openAPI";

export interface IAddSessionModalProps {
    tea: Tea;
    toggleAddSessionModalVisibility:(visibility: boolean) => void;
}
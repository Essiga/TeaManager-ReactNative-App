import {Session} from "../../openAPI";

export interface ISessionViewListProps {
    sessions: Session[];
    onItemPress: (tea: Session) => void;
}

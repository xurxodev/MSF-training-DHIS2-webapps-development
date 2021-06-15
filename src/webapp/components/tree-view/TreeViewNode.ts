import { NamedRef } from "../../../domain/entities/Base";

export interface TreeViewNode {
    id: string;
    name: string;
    children: NamedRef[];
    strikeout?: boolean;
}

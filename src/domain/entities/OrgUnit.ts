import { Id, NamedRef } from "./Base";

// maybe a class with validations in the future or a types with extended props
type OpeningDate = Date;
type ClosedDate = Date | undefined;
type Level = number;
type OrgUnitName = string;
type OrgUnitType = string;

interface OrgUnitData {
    id: Id;
    openingDate: OpeningDate;
    closedDate: ClosedDate;
    name: OrgUnitName;
    level: Level;
    children: NamedRef[];
}

const levelToType: Record<number, string> = {
    1: "Primary",
    2: "Secondary",
    3: "Tertiary",
    4: "Quaternary",
};

export class OrgUnit {
    readonly id: Id;
    readonly openingDate: OpeningDate;
    readonly closedDate: ClosedDate;
    readonly name: OrgUnitName;
    readonly level: Level;
    readonly type: OrgUnitType;

    readonly children: NamedRef[];

    private constructor({ id, name, openingDate, closedDate, level, children }: OrgUnitData) {
        this.id = id;
        this.openingDate = openingDate;
        this.closedDate = closedDate;
        this.name = name;
        this.level = level;

        this.type = levelToType[level];

        this.children = children;
    }

    // Factory method - In the future could return creation errors
    static create(data: OrgUnitData) {
        return new OrgUnit(data);
    }
}

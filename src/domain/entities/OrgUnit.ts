import { Id } from "./Base";

// maybe a class with validations in the future or a types with extended props
type OpeningDate = Date;
type Level = number;
type OrgUnitName = string;
type OrgUnitType = string;

interface OrgUnitData {
    id: Id;
    openingDate: OpeningDate;
    name: OrgUnitName;
    level: Level;
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
    readonly name: OrgUnitName;
    readonly level: Level;
    readonly type: OrgUnitType;

    private constructor({ id, name, openingDate, level }: OrgUnitData) {
        this.id = id;
        this.openingDate = openingDate;
        this.name = name;
        this.level = level;

        this.type = levelToType[level];
    }

    // Factory method - In the future could return creation errors
    static create(data: OrgUnitData) {
        return new OrgUnit(data);
    }
}

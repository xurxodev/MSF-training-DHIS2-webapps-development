import _ from "lodash";
import { OrgUnitLevels } from "../../data/Constants";
import { NamedRef } from "./Base";
import { OrgUnitLevel } from "./OrgUnitLevel";
interface OrgUnitData {
    id: string;
    code: string | undefined;
    openingDate: Date | undefined;
    closedDate: Date | undefined;
    name: string;
    level: number;
    children: NamedRef[];
    organisationUnitGroups: NamedRef[];
}

const levelToType = _.invert(OrgUnitLevels);

export class OrgUnit {
    readonly id: string;
    readonly code: string;
    readonly name: string;
    readonly openingDate: Date | undefined;
    readonly closedDate: Date | undefined;

    readonly level: number;
    readonly type: OrgUnitLevel;

    readonly children: NamedRef[];
    readonly organisationUnitGroups: NamedRef[];

    private constructor(data: OrgUnitData) {
        this.id = data.id;
        this.code = data.code ?? "";
        this.name = data.name;
        this.openingDate = data.openingDate;
        this.closedDate = data.closedDate;
        this.name = data.name;

        this.level = data.level;
        this.type = levelToType[data.level] as OrgUnitLevel;

        this.children = data.children;
        this.organisationUnitGroups = data.organisationUnitGroups;
    }

    // Factory method - In the future could return creation errors
    static create(data: OrgUnitData) {
        return new OrgUnit(data);
    }

    set<T extends keyof OrgUnitData>(key: T, value: OrgUnitData[T]): OrgUnit {
        return OrgUnit.create({ ...this, [key]: value });
    }

    setOrganisationUnitGroups(selected: NamedRef[], unselected: NamedRef[]): OrgUnit {
        const selectedIds = new Set(selected.map(group => group.id));
        const unselectedIds = new Set(unselected.map(group => group.id));
        const newOrgUnitGroups = _(this.organisationUnitGroups)
            .filter(group => !unselectedIds.has(group.id) && !selectedIds.has(group.id))
            .concat(selected)
            .value();
        return OrgUnit.create({ ...this, organisationUnitGroups: newOrgUnitGroups });
    }
}

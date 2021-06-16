import { NamedRef } from "../entities/Base";
import { OrgUnitGroupSet } from "../entities/OrgUnitGroupSet";

export interface OrgUnitGroupSetRepository {
    getOptions(id: OrgUnitGroupSet): Promise<NamedRef[]>;
}

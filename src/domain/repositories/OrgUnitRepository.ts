import { Id } from "../entities/Base";
import { OrgUnit } from "../entities/OrgUnit";

export interface OrgUnitRepository {
    get(): Promise<OrgUnit[]>;
    getById(id: Id): Promise<OrgUnit | undefined>;
    getByIds(ids: Id[]): Promise<OrgUnit[]>;
    getByLevel(level: number): Promise<OrgUnit[]>;
}

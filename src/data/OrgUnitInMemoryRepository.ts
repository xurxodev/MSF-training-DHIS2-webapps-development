import { Id } from "../domain/entities/Base";
import { OrgUnit } from "../domain/entities/OrgUnit";
import { OrgUnitRepository } from "../domain/repositories/OrgUnitRepository";
import orgUnitsData from "./orgUnits.json";

export class OrgUnitInMemoryRepository implements OrgUnitRepository {
    async get(): Promise<OrgUnit[]> {
        return orgUnitsData.map(data =>
            OrgUnit.create({ ...data, openingDate: new Date(data.openingDate) })
        );
    }

    async getById(id: Id): Promise<OrgUnit> {
        const orgUnitData = orgUnitsData.find(orgUnit => orgUnit.id === id);

        if (!orgUnitData) throw Error(`OrgUnit ${id} not found`);

        return OrgUnit.create({ ...orgUnitData, openingDate: new Date(orgUnitData.openingDate) });
    }
}

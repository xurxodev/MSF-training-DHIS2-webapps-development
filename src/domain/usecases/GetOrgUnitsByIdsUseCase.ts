import { OrgUnitRepository } from "../repositories/OrgUnitRepository";
import { OrgUnit } from "../entities/OrgUnit";
import { Id } from "../entities/Base";

export class GetOrgUnitsByIdsUseCase {
    constructor(private orgUnitRepository: OrgUnitRepository) {}

    execute(ids: Id[]): Promise<OrgUnit[]> {
        return this.orgUnitRepository.getByIds(ids);
    }
}

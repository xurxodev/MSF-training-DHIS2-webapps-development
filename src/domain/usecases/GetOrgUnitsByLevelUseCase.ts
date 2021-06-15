import { OrgUnitRepository } from "../repositories/OrgUnitRepository";
import { OrgUnit } from "../entities/OrgUnit";

export class GetOrgUnitsByLevelUseCase {
    constructor(private orgUnitRepository: OrgUnitRepository) {}

    execute(level: number): Promise<OrgUnit[]> {
        return this.orgUnitRepository.getByLevel(level);
    }
}

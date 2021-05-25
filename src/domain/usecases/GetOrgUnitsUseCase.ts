import { OrgUnitRepository } from "../repositories/OrgUnitRepository";
import { OrgUnit } from "../entities/OrgUnit";

export class GetOrgUnitsUseCase {
    constructor(private orgUnitRepository: OrgUnitRepository) {}

    execute(): Promise<OrgUnit[]> {
        return this.orgUnitRepository.get();
    }
}

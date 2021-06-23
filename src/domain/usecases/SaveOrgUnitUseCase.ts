import { OrgUnit } from "../entities/OrgUnit";
import { OrgUnitRepository } from "../repositories/OrgUnitRepository";

export class SaveOrgUnitUseCase {
    constructor(private orgUnitRepository: OrgUnitRepository) {}

    async execute(orgUnit: OrgUnit) {
        return this.orgUnitRepository.save(orgUnit);
    }
}

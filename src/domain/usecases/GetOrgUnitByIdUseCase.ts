import { Id } from "../entities/Base";
import { OrgUnit } from "../entities/OrgUnit";
import { OrgUnitRepository } from "../repositories/OrgUnitRepository";

export class GetOrgUnitByIdUseCase {
    constructor(private orgUnitRepository: OrgUnitRepository) {}

    async execute(id: Id): Promise<OrgUnit | undefined> {
        return this.orgUnitRepository.getById(id);
    }
}

import { NamedRef } from "../entities/Base";
import { OrgUnitGroupSet } from "../entities/OrgUnitGroupSet";
import { OrgUnitGroupSetRepository } from "../repositories/OrgUnitGroupSetRepository";

export class GetGroupSetOptionsUseCase {
    constructor(private groupSetRepository: OrgUnitGroupSetRepository) {}

    async execute(id: OrgUnitGroupSet): Promise<NamedRef[]> {
        return this.groupSetRepository.getOptions(id);
    }
}

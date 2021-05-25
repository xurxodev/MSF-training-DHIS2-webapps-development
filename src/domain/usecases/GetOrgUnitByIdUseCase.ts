import { OrgUnitRepository } from "../repositories/OrgUnitRepository";
import { UserRepository } from "../repositories/UserRepository";
import { OrgUnit } from "../entities/OrgUnit";
import { Id } from "../entities/Base";

export class GetOrgUnitByIdUseCase {
    constructor(
        private orgUnitRepository: OrgUnitRepository,
        private userRepository: UserRepository
    ) {}

    async execute(id: Id): Promise<OrgUnit> {
        const orgUnit = await this.orgUnitRepository.getById(id);

        const user = await this.userRepository.getCurrent();

        if (orgUnit.level > 2 && !user.isAdmin) {
            throw new Error("Only an Administrator can see this org unit detail");
        } else {
            return orgUnit;
        }
    }
}

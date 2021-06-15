import { OrgUnitInMemoryRepository } from "./data/OrgUnitInMemoryRepository";
import { UserDHIS2Repository } from "./data/UserDHIS2Repository";
import { GetCurrentUserUseCase } from "./domain/usecases/GetCurrentUserUseCase";
import { GetOrgUnitByIdUseCase } from "./domain/usecases/GetOrgUnitByIdUseCase";
import { GetOrgUnitsUseCase } from "./domain/usecases/GetOrgUnitsUseCase";
import { D2Api } from "./types/d2-api";

export function getCompositionRoot(api: D2Api) {
    const orgUnitRepository = new OrgUnitInMemoryRepository();
    const userRepository = new UserDHIS2Repository(api);

    return {
        orgUnits: {
            get: new GetOrgUnitsUseCase(orgUnitRepository),
            getById: new GetOrgUnitByIdUseCase(orgUnitRepository, userRepository),
        },
        users: {
            getCurrent: new GetCurrentUserUseCase(userRepository),
        },
    };
}

export type CompositionRoot = ReturnType<typeof getCompositionRoot>;

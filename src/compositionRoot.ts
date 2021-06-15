import { OrgUnitInMemoryRepository } from "./data/OrgUnitInMemoryRepository";
import { UserDHIS2Repository } from "./data/UserDHIS2Repository";
import { GetCurrentUserUseCase } from "./domain/usecases/GetCurrentUserUseCase";
import { GetOrgUnitByIdUseCase } from "./domain/usecases/GetOrgUnitByIdUseCase";
import { GetOrgUnitsByIdsUseCase } from "./domain/usecases/GetOrgUnitsByIdsUseCase";
import { GetOrgUnitsByLevelUseCase } from "./domain/usecases/GetOrgUnitsByLevelUseCase";
import { GetOrgUnitsUseCase } from "./domain/usecases/GetOrgUnitsUseCase";
import { D2Api } from "./types/d2-api";

export function getCompositionRoot(api: D2Api) {
    const orgUnitRepository = new OrgUnitInMemoryRepository();
    const userRepository = new UserDHIS2Repository(api);

    return {
        orgUnits: {
            get: new GetOrgUnitsUseCase(orgUnitRepository),
            getById: new GetOrgUnitByIdUseCase(orgUnitRepository, userRepository),
            getByIds: new GetOrgUnitsByIdsUseCase(orgUnitRepository),
            getByLevel: new GetOrgUnitsByLevelUseCase(orgUnitRepository),
        },
        users: {
            getCurrent: new GetCurrentUserUseCase(userRepository),
        },
    };
}

export type CompositionRoot = ReturnType<typeof getCompositionRoot>;

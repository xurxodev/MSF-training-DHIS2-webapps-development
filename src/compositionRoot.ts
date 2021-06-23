import { OrgUnitDHIS2Repository } from "./data/OrgUnitDHIS2Repository";
import { OrgUnitGroupSetDHIS2Repository } from "./data/OrgUnitGroupSetDHIS2Repository";
import { UserDHIS2Repository } from "./data/UserDHIS2Repository";
import { GetCurrentUserUseCase } from "./domain/usecases/GetCurrentUserUseCase";
import { GetGroupSetOptionsUseCase } from "./domain/usecases/GetGroupSetOptionsUseCase";
import { GetOrgUnitByIdUseCase } from "./domain/usecases/GetOrgUnitByIdUseCase";
import { GetOrgUnitsByIdsUseCase } from "./domain/usecases/GetOrgUnitsByIdsUseCase";
import { GetOrgUnitsByLevelUseCase } from "./domain/usecases/GetOrgUnitsByLevelUseCase";
import { GetOrgUnitsUseCase } from "./domain/usecases/GetOrgUnitsUseCase";
import { SaveOrgUnitUseCase } from "./domain/usecases/SaveOrgUnitUseCase";
import { D2Api } from "./types/d2-api";

export function getCompositionRoot(api: D2Api) {
    const orgUnitRepository = new OrgUnitDHIS2Repository(api);
    const groupSetRepository = new OrgUnitGroupSetDHIS2Repository(api);
    const userRepository = new UserDHIS2Repository(api);

    return {
        orgUnits: {
            get: new GetOrgUnitsUseCase(orgUnitRepository),
            getById: new GetOrgUnitByIdUseCase(orgUnitRepository),
            getByIds: new GetOrgUnitsByIdsUseCase(orgUnitRepository),
            getByLevel: new GetOrgUnitsByLevelUseCase(orgUnitRepository),
            save: new SaveOrgUnitUseCase(orgUnitRepository),
        },
        groupSets: {
            getOptions: new GetGroupSetOptionsUseCase(groupSetRepository),
        },
        users: {
            getCurrent: new GetCurrentUserUseCase(userRepository),
        },
    };
}

export type CompositionRoot = ReturnType<typeof getCompositionRoot>;

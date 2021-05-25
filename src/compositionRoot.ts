import { D2Api } from "./types/d2-api";
import { Dhis2DataValueRepository } from "./data/Dhis2DataValueRepository";
import { GetDataValuesUseCase } from "./domain/usecases/GetDataValuesUseCase";
import { OrgUnitInMemoryRepository } from "./data/OrgUnitInMemoryRepository";
import { GetOrgUnitsUseCase } from "./domain/usecases/GetOrgUnitsUseCase";
import { GetOrgUnitByIdUseCase } from "./domain/usecases/GetOrgUnitByIdUseCase";
import { UserInMemoryRepository } from "./data/UserInMemoryRepository";

export function getCompositionRoot(api: D2Api) {
    const dataValueRepository = new Dhis2DataValueRepository(api);
    const orgUnitRepository = new OrgUnitInMemoryRepository();
    const userRepository = new UserInMemoryRepository();

    return {
        dataValues: {
            get: new GetDataValuesUseCase(dataValueRepository),
        },
        orgUnits: {
            get: new GetOrgUnitsUseCase(orgUnitRepository),
            getById: new GetOrgUnitByIdUseCase(orgUnitRepository, userRepository),
        },
    };
}

export type CompositionRoot = ReturnType<typeof getCompositionRoot>;

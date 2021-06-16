import { OrgUnitGroupSet } from "../domain/entities/OrgUnitGroupSet";
import { OrgUnitLevel } from "../domain/entities/OrgUnitLevel";

export const OrgUnitGroupSets: Record<OrgUnitGroupSet, string> = {
    ProjectType: "rQjuGZcxNxE",
    PopulationType: "iiFM3YudVxq",
    TypeManagement: "ZximACPowCs",
    Event: "DIYl9kZDij3",
    Context: "lR7GVB43jaX",
    HealthService: "BtFXTpKRl6n",
    HealthServiceType: "akYeq1mMz2N",
    SiteType: "ZxNjaKVXY1D",
};

export const OrgUnitLevels: Record<OrgUnitLevel, number> = {
    MSF: 1,
    OperationalCenter: 2,
    Mission: 3,
    Project: 4,
    HealthSite: 5,
    HealthService: 6,
};

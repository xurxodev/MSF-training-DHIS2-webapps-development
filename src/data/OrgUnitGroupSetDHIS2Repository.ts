import _ from "lodash";
import { NamedRef } from "../domain/entities/Base";
import { OrgUnitGroupSet } from "../domain/entities/OrgUnitGroupSet";
import { OrgUnitGroupSetRepository } from "../domain/repositories/OrgUnitGroupSetRepository";
import { D2Api } from "../types/d2-api";
import { OrgUnitGroupSets } from "./Constants";

export class OrgUnitGroupSetDHIS2Repository implements OrgUnitGroupSetRepository {
    constructor(private api: D2Api) {}

    async getOptions(id: OrgUnitGroupSet): Promise<NamedRef[]> {
        const { objects } = await this.api.models.organisationUnitGroupSets
            .get({
                filter: { id: { eq: OrgUnitGroupSets[id] } },
                fields: { organisationUnitGroups: { id: true, name: true } },
                paging: false,
            })
            .getData();

        return _.flatMap(objects, ({ organisationUnitGroups }) => organisationUnitGroups);
    }
}

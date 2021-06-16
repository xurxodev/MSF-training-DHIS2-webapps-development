import { Id } from "../domain/entities/Base";
import { OrgUnit } from "../domain/entities/OrgUnit";
import { OrgUnitRepository } from "../domain/repositories/OrgUnitRepository";
import { D2Api, D2ApiDefinition, D2OrganisationUnitSchema, Model } from "../types/d2-api";

export class OrgUnitDHIS2Repository implements OrgUnitRepository {
    constructor(private api: D2Api) {}

    async get(): Promise<OrgUnit[]> {
        return this.request({});
    }

    async getById(id: Id): Promise<OrgUnit | undefined> {
        const objects = await this.request({ filter: { id: { eq: id } } });
        return objects[0];
    }

    async getByIds(ids: Id[]): Promise<OrgUnit[]> {
        return this.request({ filter: { id: { in: ids } } });
    }

    async getByLevel(level: number): Promise<OrgUnit[]> {
        return this.request({ filter: { level: { eq: `${level}` } } });
    }

    private async request(
        options: Omit<
            Parameters<Model<D2ApiDefinition, D2OrganisationUnitSchema>["get"]>[0],
            "paging" | "fields"
        >
    ) {
        const { objects } = await this.api.models.organisationUnits
            .get({
                ...options,
                fields: {
                    id: true,
                    code: true,
                    name: true,
                    level: true,
                    openingDate: true,
                    closedDate: true,
                    parent: { id: true, name: true },
                    children: { id: true, name: true },
                    organisationUnitGroups: { id: true, name: true },
                },
                paging: false,
            })
            .getData();

        return objects.map(data =>
            OrgUnit.create({
                ...data,
                openingDate: data.openingDate ? new Date(data.openingDate) : undefined,
                closedDate: data.closedDate ? new Date(data.closedDate) : undefined,
            })
        );
    }
}

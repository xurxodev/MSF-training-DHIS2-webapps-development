import _ from "lodash";
import { Id, NamedRef } from "../domain/entities/Base";
import { OrgUnit } from "../domain/entities/OrgUnit";
import { OrgUnitRepository } from "../domain/repositories/OrgUnitRepository";
import { D2Api, D2ApiDefinition, D2OrganisationUnitSchema, Model, Ref } from "../types/d2-api";

interface D2OrgUnit {
    id: Id;
    code: string;
    name: string;
    shortName: string;
    level: number;
    path: string;
    parent: Ref;
    openingDate?: string;
    closedDate?: string;
    children: NamedRef[];
    organisationUnitGroups: NamedRef[];
}

type Options = Pick<
    Parameters<Model<D2ApiDefinition, D2OrganisationUnitSchema>["get"]>[0],
    "filter"
>;

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

    async save(orgUnit: OrgUnit) {
        const existingD2OrgUnit = await this.getD2OrgUnitFromId(orgUnit.id);
        const orgUnitGroupsToSave = await this.getOrgUnitGroupsToSave(orgUnit, existingD2OrgUnit);
        const orgUnitToSave = { ...existingD2OrgUnit, ...this.buildD2OrgUnit(orgUnit) };
        const metadata = {
            organisationUnits: [orgUnitToSave],
            organisationUnitGroups: orgUnitGroupsToSave,
        };
        const res = await this.api.metadata.post(metadata).getData();

        if (res.status !== "OK") throw new Error("Cannot save organisation unit");
    }

    private async getOrgUnitGroupsToSave(
        orgUnit: OrgUnit,
        existingD2OrgUnit: D2OrgUnit | undefined
    ) {
        const existingOrgUnitGroups = await this.getOrgUnitGroups(orgUnit, existingD2OrgUnit);

        const orgUnitGroupsUpdated = existingOrgUnitGroups.map(ouGroup => {
            const ouWasInGroup = _(ouGroup.organisationUnits).some(ou => ou.id === orgUnit.id);
            const ouInGroup = _(orgUnit.organisationUnitGroups).some(oug => oug.id === ouGroup.id);
            const orgUnitGroupHasChanged = ouWasInGroup !== ouInGroup;

            if (!orgUnitGroupHasChanged) {
                // As there are no changes, there is no need to save this org unit group.
                return null;
            } else {
                const organisationUnitsUpdated = ouInGroup
                    ? ouGroup.organisationUnits.concat([orgUnit])
                    : ouGroup.organisationUnits.filter(ou => ou.id !== orgUnit.id);

                return { ...ouGroup, organisationUnits: organisationUnitsUpdated };
            }
        });

        return _.compact(orgUnitGroupsUpdated);
    }

    /* Get the union of org unit groups both for the existing org unit and the unsaved record */
    private async getOrgUnitGroups(orgUnit: OrgUnit, existingD2OrgUnit: D2OrgUnit | undefined) {
        const existingOrgUnitGroupRefs = existingD2OrgUnit
            ? existingD2OrgUnit.organisationUnitGroups
            : [];
        const newOrgUnitGroupRefs = orgUnit.organisationUnitGroups;
        const allOrgUnitGroupRefs = _.concat(existingOrgUnitGroupRefs, newOrgUnitGroupRefs);

        const { organisationUnitGroups } = await this.api.metadata
            .get({
                organisationUnitGroups: {
                    fields: { $owner: true },
                    filter: { id: { in: _.uniq(allOrgUnitGroupRefs.map(oug => oug.id)) } },
                },
            })
            .getData();

        return organisationUnitGroups;
    }

    private async getD2OrgUnits(options: Options): Promise<D2OrgUnit[]> {
        const { objects } = await this.api.models.organisationUnits
            .get({
                ...options,
                fields: {
                    $owner: true,
                    children: { id: true, name: true },
                    organisationUnitGroups: { id: true, name: true },
                },
                paging: false,
            })
            .getData();

        return objects;
    }

    private async getD2OrgUnitFromId(id: Id): Promise<D2OrgUnit | undefined> {
        const orgUnits = await this.getD2OrgUnits({ filter: { id: { eq: id } } });
        return _.first(orgUnits);
    }

    private async request(options: Options): Promise<OrgUnit[]> {
        const d2OrgUnits = await this.getD2OrgUnits(options);
        return d2OrgUnits.map(data => this.buildOrgUnit(data));
    }

    private buildOrgUnit(d2OrgUnit: D2OrgUnit): OrgUnit {
        return OrgUnit.create({
            ...d2OrgUnit,
            openingDate: d2OrgUnit.openingDate ? new Date(d2OrgUnit.openingDate) : undefined,
            closedDate: d2OrgUnit.closedDate ? new Date(d2OrgUnit.closedDate) : undefined,
        });
    }

    private buildD2OrgUnit(orgUnit: OrgUnit): Partial<D2OrgUnit> {
        return {
            ...orgUnit,
            openingDate: orgUnit.openingDate?.toISOString(),
            closedDate: orgUnit.closedDate?.toISOString(),
        };
    }
}

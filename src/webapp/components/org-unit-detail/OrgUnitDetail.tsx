import { useSnackbar } from "@eyeseetea/d2-ui-components";
import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Id } from "../../../domain/entities/Base";
import { OrgUnit } from "../../../domain/entities/OrgUnit";
import { OrgUnitLevel } from "../../../domain/entities/OrgUnitLevel";
import i18n from "../../../locales";
import { useAppContext } from "../../contexts/app-context";
import { ProjectLevelDetails } from "./levels/ProjectLevelDetails";

interface OrgUnitsDetailProps {
    orgUnitId: Id;
    onSave(orgUnit: OrgUnit): void;
}

const OrgUnitDetail: React.FC<OrgUnitsDetailProps> = ({ orgUnitId, onSave }) => {
    const { compositionRoot } = useAppContext();
    const [orgUnit, setOrgUnit] = useState<OrgUnit>();
    const [orgUnitToSave, setOrgUnitToSave] = useState<OrgUnit>();

    useEffect(() => {
        compositionRoot.orgUnits.getById.execute(orgUnitId).then(setOrgUnit);
    }, [compositionRoot, orgUnitId]);

    const snackbar = useSnackbar();

    useEffect(() => {
        async function saveOrgUnit(orgUnit: OrgUnit) {
            try {
                await compositionRoot.orgUnits.save.execute(orgUnit);
                onSave(orgUnit);
                setOrgUnit(orgUnit);
                setOrgUnitToSave(undefined);
                snackbar.success(i18n.t("Project saved"));
            } catch (err) {
                snackbar.error(err.message);
            }
        }

        if (orgUnitToSave) saveOrgUnit(orgUnitToSave);
    }, [orgUnit, setOrgUnit, orgUnitToSave, setOrgUnitToSave, compositionRoot, snackbar, onSave]);

    if (!orgUnit) {
        return (
            <Container>
                {i18n.t("Organisation unit {{orgUnitId}} not found", { orgUnitId })}
            </Container>
        );
    }

    return (
        <Container>
            <h2>{formatOrgUnitLevel(orgUnit.type)}</h2>

            <DetailsByLevel orgUnit={orgUnit} onSave={setOrgUnitToSave} />
        </Container>
    );
};

const DetailsByLevel: React.FC<{ orgUnit: OrgUnit; onSave(orgUnit: OrgUnit): void }> = ({
    onSave,
    orgUnit,
}) => {
    switch (orgUnit.type) {
        case "Project":
            return <ProjectLevelDetails orgUnit={orgUnit} onSave={onSave} />;
        default:
            return null;
    }
};

const Container = styled(Paper)`
    width: 90%;
    margin: 16px;
    border: 1px solid lightgrey;
    padding: 25px;
`;

function formatOrgUnitLevel(level: OrgUnitLevel): string {
    switch (level) {
        case "MSF":
            return i18n.t("MSF");
        case "Project":
            return i18n.t("Project");
        case "OperationalCenter":
            return i18n.t("Operational Center");
        case "Mission":
            return i18n.t("Mission");
        case "HealthSite":
            return i18n.t("Health Site");
        case "HealthService":
            return i18n.t("Health Service");
    }
}

export default OrgUnitDetail;

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
}

const OrgUnitDetail: React.FC<OrgUnitsDetailProps> = ({ orgUnitId }) => {
    const { compositionRoot } = useAppContext();
    const [orgUnit, setOrgUnit] = useState<OrgUnit>();

    useEffect(() => {
        compositionRoot.orgUnits.getById.execute(orgUnitId).then(setOrgUnit);
    }, [compositionRoot, orgUnitId]);

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

            <DetailsByLevel orgUnit={orgUnit} />
        </Container>
    );
};

const DetailsByLevel: React.FC<{ orgUnit: OrgUnit }> = ({ orgUnit }) => {
    switch (orgUnit.type) {
        case "Project":
            return <ProjectLevelDetails orgUnit={orgUnit} />;
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

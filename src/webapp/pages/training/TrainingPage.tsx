import React, { useState } from "react";
import styled from "styled-components";
import { Id } from "../../../domain/entities/Base";
import i18n from "../../../locales";
import OrgUnitDetail from "../../components/org-unit-detail/OrgUnitDetail";
import OrgUnitsList from "../../components/org-unit-list/OrgUnitList";

export const TrainingPage: React.FC = () => {
    const [selectedOrgUnit, setSelectedOrgUnit] = useState<Id>();

    const handleOnChange = (orgUnitId: Id) => {
        setSelectedOrgUnit(orgUnitId);
    };

    return (
        <Container>
            <LeftPanel>
                <OrgUnitsList onSelectedOrgUnit={handleOnChange} />
            </LeftPanel>

            <RightPanel>
                <h1>{i18n.t("Training session 2")}</h1>

                {selectedOrgUnit && <OrgUnitDetail orgUnitId={selectedOrgUnit} />}
            </RightPanel>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 95vh;
`;

const LeftPanel = styled.div`
    background-color: #f5f5f5;
    width: 400px;
    display: flex;
    justify-content: center;
`;

const RightPanel = styled.div`
    background-color: #fff;
    flex-grow: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 32px;
`;

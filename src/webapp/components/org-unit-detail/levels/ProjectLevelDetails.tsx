import { DatePicker } from "@eyeseetea/d2-ui-components";
import { Button, TextField } from "@material-ui/core";
import _ from "lodash";
import React, { useState } from "react";
import styled from "styled-components";
import { NamedRef } from "../../../../domain/entities/Base";
import { OrgUnit } from "../../../../domain/entities/OrgUnit";
import i18n from "../../../../locales";
import { GroupSetDropdown } from "../../group-set-dropdown/GroupSetDropdown";
import { IconButton } from "../../icon-button/IconButton";

export interface ProjectLevelDetailsProps {
    orgUnit: OrgUnit;
    onSave(orgUnit: OrgUnit): void;
}

export const ProjectLevelDetails: React.FC<ProjectLevelDetailsProps> = props => {
    const [orgUnit, setOrgUnit] = useState(props.orgUnit);
    const [editable, setEditable] = useState<boolean>(false);

    if (orgUnit.closedDate !== undefined) {
        return <h3>{i18n.t("The selected organisation unit is disabled")}</h3>;
    }

    function updateOrgUnitGroups(selectedGroup: NamedRef[], unselectedGroups: NamedRef[]) {
        const orgUnitUpdated = orgUnit.setOrganisationUnitGroups(selectedGroup, unselectedGroups);
        setOrgUnit(orgUnitUpdated);
    }

    function clearForm() {
        setOrgUnit(props.orgUnit);
        setEditable(false);
    }

    return (
        <Container>
            <Row>
                <NameInput
                    label={i18n.t("Name")}
                    value={orgUnit.name}
                    disabled={!editable}
                    onChange={ev => setOrgUnit(orgUnit.set("name", ev.target.value))}
                />

                <IconButton
                    tooltip={i18n.t("Edit")}
                    icon={editable ? "cancel" : "edit"}
                    onClick={() => setEditable(editable => !editable)}
                />
            </Row>

            <Row>
                <DateInput
                    label={i18n.t("Opening Date")}
                    value={orgUnit.openingDate ?? null}
                    onChange={momentDate =>
                        setOrgUnit(orgUnit.set("openingDate", momentDate.toDate()))
                    }
                    disabled={!editable}
                />

                <CodeInput
                    label={i18n.t("Code")}
                    value={orgUnit.code}
                    onChange={ev => setOrgUnit(orgUnit.set("code", ev.target.value))}
                    disabled={!editable}
                />
            </Row>

            <Row>
                <GroupSetDropdown
                    orgUnit={orgUnit}
                    groupSet={"ProjectType"}
                    onChange={updateOrgUnitGroups}
                    disabled={!editable}
                />
                <GroupSetDropdown
                    orgUnit={orgUnit}
                    groupSet={"PopulationType"}
                    onChange={updateOrgUnitGroups}
                    disabled={!editable}
                />
                <GroupSetDropdown
                    orgUnit={orgUnit}
                    groupSet={"TypeManagement"}
                    onChange={updateOrgUnitGroups}
                    disabled={!editable}
                />
            </Row>

            <Row>
                <GroupSetDropdown
                    orgUnit={orgUnit}
                    groupSet={"Event"}
                    onChange={updateOrgUnitGroups}
                    disabled={!editable}
                />
                <GroupSetDropdown
                    orgUnit={orgUnit}
                    groupSet={"Context"}
                    onChange={updateOrgUnitGroups}
                    disabled={!editable}
                />
            </Row>

            {editable && (
                <Row>
                    <FormButton variant="contained" onClick={() => props.onSave(orgUnit)}>
                        {i18n.t("Save")}
                    </FormButton>

                    <FormButton variant="contained" color="secondary" onClick={clearForm}>
                        {i18n.t("Clear form")}
                    </FormButton>
                </Row>
            )}
        </Container>
    );
};

const FormButton = styled(Button)`
    margin: 10px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;

    > div {
        margin: 10px;
    }
`;

const NameInput = styled(TextField)`
    width: 620px;
`;

const CodeInput = styled(TextField)`
    width: 300px;
    margin-left: 18px;
    margin-top: 16px;
    margin-bottom: 8px;
`;

const DateInput = styled(DatePicker)`
    width: 300px;

    input {
        color: ${props => (props.disabled ? "rgba(0, 0, 0, 0.54)" : "inherit")};
    }

    && > label {
        color: ${props => (props.disabled ? "rgba(0, 0, 0, 0.54)" : "inherit")};
    }
`;

import { DatePicker } from "@eyeseetea/d2-ui-components";
import { TextField } from "@material-ui/core";
import _ from "lodash";
import React, { useState } from "react";
import styled from "styled-components";
import { OrgUnit } from "../../../../domain/entities/OrgUnit";
import i18n from "../../../../locales";
import { GroupSetDropdown } from "../../group-set-dropdown/GroupSetDropdown";
import { IconButton } from "../../icon-button/IconButton";

export interface ProjectLevelDetailsProps {
    orgUnit: OrgUnit;
}

export const ProjectLevelDetails: React.FC<ProjectLevelDetailsProps> = ({ orgUnit }) => {
    const [editable, setEditable] = useState<boolean>(false);

    if (orgUnit.closedDate !== undefined) {
        return <h3>{i18n.t("The selected organisation unit is disabled")}</h3>;
    }

    return (
        <Container>
            <Row>
                <NameInput label={i18n.t("Name")} value={orgUnit.name} disabled={!editable} />
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
                    onChange={_.noop}
                    disabled={!editable}
                />

                <CodeInput label={i18n.t("Code")} value={orgUnit.code} disabled={!editable} />
            </Row>

            <Row>
                <GroupSetDropdown orgUnit={orgUnit} groupSet={"ProjectType"} disabled={!editable} />
                <GroupSetDropdown
                    orgUnit={orgUnit}
                    groupSet={"PopulationType"}
                    disabled={!editable}
                />
                <GroupSetDropdown
                    orgUnit={orgUnit}
                    groupSet={"TypeManagement"}
                    disabled={!editable}
                />
            </Row>

            <Row>
                <GroupSetDropdown orgUnit={orgUnit} groupSet={"Event"} disabled={!editable} />
                <GroupSetDropdown orgUnit={orgUnit} groupSet={"Context"} disabled={!editable} />
            </Row>
        </Container>
    );
};

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

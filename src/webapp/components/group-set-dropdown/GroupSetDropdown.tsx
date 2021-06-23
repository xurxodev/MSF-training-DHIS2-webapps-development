import { Dropdown, DropdownItem } from "@eyeseetea/d2-ui-components";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NamedRef } from "../../../domain/entities/Base";
import { OrgUnit } from "../../../domain/entities/OrgUnit";
import { OrgUnitGroupSet } from "../../../domain/entities/OrgUnitGroupSet";
import i18n from "../../../locales";
import { useAppContext } from "../../contexts/app-context";
import { IconButton } from "../icon-button/IconButton";

export interface GroupSetDropdownProps {
    groupSet: OrgUnitGroupSet;
    orgUnit: OrgUnit;
    disabled?: boolean;
    onChange?(selectedGroups: NamedRef[], unselectedGroups: NamedRef[]): void;
}

export const GroupSetDropdown: React.FC<GroupSetDropdownProps> = ({
    groupSet,
    orgUnit,
    disabled,
    onChange,
}) => {
    const { compositionRoot } = useAppContext();

    const [groups, setGroups] = useState<NamedRef[]>([]);

    const groupOptions = namedRefToOption(groups);

    const intersection = _.intersection(
        orgUnit.organisationUnitGroups.map(({ id }) => id),
        groupOptions.map(({ value }) => value)
    );

    useEffect(() => {
        compositionRoot.groupSets.getOptions.execute(groupSet).then(groups => {
            setGroups(groups);
        });
    }, [compositionRoot, groupSet]);

    function notifyChange(groupId: string | undefined) {
        if (!onChange) return;
        const selectedGroup = groups.filter(group => group.id === groupId);
        const unselectedGroups = groups.filter(group => group.id !== groupId);
        onChange(selectedGroup, unselectedGroups);
    }

    return (
        <React.Fragment>
            <GroupInput
                label={formatOrgUnitGroupSet(groupSet)}
                value={intersection[0]}
                items={groupOptions}
                onChange={notifyChange}
                disabled={disabled}
            />

            {intersection.length > 1 ? (
                <IconButton
                    tooltip={i18n.t("Organisation unit is assigned to more than one option")}
                    icon="warning"
                    color="error"
                />
            ) : null}
        </React.Fragment>
    );
};

function namedRefToOption(options: NamedRef[]): DropdownItem[] {
    return options.map(({ id, name }) => ({ value: id, text: name }));
}

function formatOrgUnitGroupSet(groupSet: OrgUnitGroupSet): string {
    switch (groupSet) {
        case "Context":
            return i18n.t("Context");
        case "Event":
            return i18n.t("Events");
        case "TypeManagement":
            return i18n.t("Type of management");
        case "PopulationType":
            return i18n.t("Population type");
        case "ProjectType":
            return i18n.t("Project type");
        default:
            return i18n.t("Unknown group set");
    }
}

const GroupInput = styled(Dropdown)<{ disabled?: boolean }>`
    width: 310px;
    margin-top: 16px;
    margin-bottom: 8px;

    pointer-events: ${props => (props.disabled ? "none" : "inherit")};

    && {
        margin-left: 0;
    }

    & > div:before {
        border-bottom: 1px solid rgba(0, 0, 0, 0.42);
        border-bottom-style: ${props => (props.disabled ? "dotted" : "solid")};
    }

    & > div:after {
        border-bottom: 1px solid rgba(0, 0, 0, 0.42);
        border-bottom-style: ${props => (props.disabled ? "dotted" : "solid")};
    }

    & > div:hover:before {
        border-bottom: 1px solid rgba(0, 0, 0, 0.42);
        border-bottom-style: ${props => (props.disabled ? "dotted" : "solid")};
    }

    & > div:hover:after {
        border-bottom: 1px solid rgba(0, 0, 0, 0.42);
        border-bottom-style: ${props => (props.disabled ? "dotted" : "solid")};
    }

    & > label {
        color: ${props => (props.disabled ? "rgba(0, 0, 0, 0.54)" : "#494949")};
    }

    div {
        color: ${props => (props.disabled ? "rgba(0, 0, 0, 0.54)" : "#494949")};
    }

    & > .Mui-focused {
        color: #1976d2;

        :after {
            border-bottom: 2px solid #1976d2;
        }
    }
`;

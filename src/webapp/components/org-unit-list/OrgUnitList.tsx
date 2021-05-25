import React, { useEffect, useState } from "react";
import { Id } from "../../../domain/entities/Base";
import { OrgUnit } from "../../../domain/entities/OrgUnit";
import { useAppContext } from "../../contexts/app-context";
import "./OrgUnitList.css";

interface OrgUnitListProps {
    onSelectedOrgUnit?: (orgUnitId: Id) => void;
}

const OrgUnitList: React.FC<OrgUnitListProps> = ({ onSelectedOrgUnit }) => {
    const { compositionRoot } = useAppContext();
    const [orgUnits, setOrgUnits] = useState<OrgUnit[]>([]);

    useEffect(() => {
        compositionRoot.orgUnits.get.execute().then(setOrgUnits);
    }, [compositionRoot.orgUnits.get]);

    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (onSelectedOrgUnit) {
            onSelectedOrgUnit(event.target.value);
        }
    };

    return (
        <select id="org-units" name="org units" size={orgUnits.length} onChange={handleOnChange}>
            {orgUnits.map(orgUnit => {
                return (
                    <option key={orgUnit.id} value={orgUnit.id}>
                        {orgUnit.name}
                    </option>
                );
            })}
        </select>
    );
};

export default OrgUnitList;

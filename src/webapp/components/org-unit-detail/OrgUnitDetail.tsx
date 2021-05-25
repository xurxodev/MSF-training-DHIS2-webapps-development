import React, { useEffect, useState } from "react";
import { Id } from "../../../domain/entities/Base";
import { OrgUnit } from "../../../domain/entities/OrgUnit";
import { useAppContext } from "../../contexts/app-context";
import "./OrgUnitDetail.css";
import i18n from "../../../locales";

interface OrgUnitsDetailProps {
    orgUnitId: Id;
}

const OrgUnitDetail: React.FC<OrgUnitsDetailProps> = ({ orgUnitId }) => {
    const { compositionRoot } = useAppContext();
    const [orgUnit, setOrgUnit] = useState<OrgUnit>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        compositionRoot.orgUnits.getById
            .execute(orgUnitId)
            .then(orgUnit => {
                setOrgUnit(orgUnit);
                setError(undefined);
            })
            .catch(error => {
                setOrgUnit(undefined);
                setError(error.message);
            });
    }, [compositionRoot.orgUnits.getById, orgUnitId]);

    return (
        <div id="details-container">
            {orgUnit && (
                <div>
                    <div>
                        <label>{i18n.t("Name")}</label>
                        <input type="text" value={orgUnit?.name} disabled />
                    </div>

                    <div>
                        <label>{i18n.t("Opening Date")}</label>
                        <input
                            type="text"
                            value={orgUnit?.openingDate.toLocaleDateString()}
                            disabled
                        />
                    </div>

                    <div>
                        <label>{i18n.t("Type")}</label>
                        <input type="text" value={orgUnit?.type} disabled />
                    </div>
                </div>
            )}
            {error && error}
        </div>
    );
};

export default OrgUnitDetail;

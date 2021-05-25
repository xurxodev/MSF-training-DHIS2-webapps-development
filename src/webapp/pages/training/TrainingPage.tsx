import React, { useState } from "react";
import { Id } from "../../../domain/entities/Base";
import i18n from "../../../locales";
import OrgUnitDetail from "../../components/org-unit-detail/OrgUnitDetail";
import OrgUnitsList from "../../components/org-unit-list/OrgUnitList";
import "./TrainingPage.css";

const TrainingPage: React.FC = () => {
    const [selectedOrgUnit, setSelectedOrgUnit] = useState<Id>();

    const handleOnChange = (orgUnitId: Id) => {
        setSelectedOrgUnit(orgUnitId);
    };

    return (
        <div id="training-container">
            <div id="left-panel">
                <OrgUnitsList onSelectedOrgUnit={handleOnChange} />
            </div>

            <div id="right-panel">
                <h1>{i18n.t("Training session 2")}</h1>

                {selectedOrgUnit && <OrgUnitDetail orgUnitId={selectedOrgUnit} />}
            </div>
        </div>
    );
};

export default TrainingPage;

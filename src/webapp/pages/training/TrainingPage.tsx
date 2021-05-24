import React from "react";
import i18n from "../../../locales";
import "./TrainingPage.css";

const TrainingPage: React.FC = () => {
    return (
        <div id="training-container">
            <h1>{i18n.t("Training!!")}</h1>
        </div>
    );
};

export default TrainingPage;

import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { TrainingPage } from "../training/TrainingPage";

const Root = () => {
    return (
        <HashRouter>
            <Switch>
                {/* Default route */}
                <Route render={() => <TrainingPage />} />
            </Switch>
        </HashRouter>
    );
};

export default Root;

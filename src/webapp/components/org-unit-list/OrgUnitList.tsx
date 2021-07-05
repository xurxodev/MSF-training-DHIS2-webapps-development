import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Id } from "../../../domain/entities/Base";
import { OrgUnit } from "../../../domain/entities/OrgUnit";
import { useAppContext } from "../../contexts/app-context";
import { TreeView } from "../tree-view/TreeView";
import { TreeViewNode } from "../tree-view/TreeViewNode";

interface OrgUnitListProps {
    onSelectedOrgUnit?: (orgUnitId: Id) => void;
    refreshKey: Date;
}

const OrgUnitList: React.FC<OrgUnitListProps> = ({ onSelectedOrgUnit, refreshKey }) => {
    const { compositionRoot } = useAppContext();
    const [roots, setOrgUnitRoots] = useState<TreeViewNode[]>([]);

    const findOrgUnit = useCallback(
        async (ids: string[]) => {
            const orgUnits = await compositionRoot.orgUnits.getByIds.execute(ids);
            return buildNodes(orgUnits);
        },
        [compositionRoot]
    );

    useEffect(() => {
        compositionRoot.orgUnits.getByLevel
            .execute(2)
            .then(orgUnits =>
                setOrgUnitRoots(buildNodes(orgUnits.filter(({ name }) => name === "OCBA")))
            );
    }, [compositionRoot, refreshKey]);

    return (
        <Container>
            {roots.map(root => (
                <TreeView
                    key={`tree-${root.id}`}
                    root={root}
                    findNodes={findOrgUnit}
                    onNodeSelect={onSelectedOrgUnit}
                />
            ))}
        </Container>
    );
};

function buildNodes(orgUnits: OrgUnit[]): TreeViewNode[] {
    return orgUnits.map(({ id, name, children, closedDate }) => ({
        id,
        name,
        children,
        strikeout: closedDate !== undefined,
    }));
}

const Container = styled.div`
    display: block;
    width: 100%;
    overflow: auto;
    padding: 10px;
`;

export default OrgUnitList;

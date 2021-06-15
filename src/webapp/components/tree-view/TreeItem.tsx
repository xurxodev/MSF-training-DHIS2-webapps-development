import { LinearProgress } from "@material-ui/core";
import MUITreeItem from "@material-ui/lab/TreeItem";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TreeViewNode } from "./TreeViewNode";

export interface TreeItemProps {
    className?: string;
    node: TreeViewNode;
    findNodes: (ids: string[]) => Promise<TreeViewNode[]>;
}

const BaseTreeItem: React.FC<TreeItemProps> = ({ className, node, findNodes }) => {
    const [children, setChildren] = useState<TreeViewNode[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const ids = node.children.map(({ id }) => id);

        findNodes(ids).then(children => {
            setChildren(children);
            setLoading(false);
        });
    }, [node, findNodes]);

    return (
        <MUITreeItem
            className={className}
            nodeId={node.id}
            label={<TreeItemLabel text={node.name} loading={loading} />}
        >
            {children.length > 0
                ? children.map(subnode => (
                      <TreeItem key={subnode.id} node={subnode} findNodes={findNodes} />
                  ))
                : null}
        </MUITreeItem>
    );
};

export const TreeItem = styled(BaseTreeItem)`
    text-decoration: ${props => (props.node.strikeout ? "line-through" : "inherit")};
`;

const TreeItemLabel: React.FC<{ text: string; loading?: boolean }> = ({ text, loading }) => {
    return (
        <React.Fragment>
            {text}
            {loading && <LinearProgress />}
        </React.Fragment>
    );
};

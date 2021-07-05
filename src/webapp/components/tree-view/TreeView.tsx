import OpenIcon from "@material-ui/icons/AddBoxOutlined";
import CloseIcon from "@material-ui/icons/IndeterminateCheckBoxOutlined";
import MUITreeView from "@material-ui/lab/TreeView";
import React from "react";
import styled from "styled-components";
import { TreeItem } from "./TreeItem";
import { TreeViewNode } from "./TreeViewNode";

export interface TreeViewProps {
    className?: string;
    root: TreeViewNode;
    findNodes: (ids: string[]) => Promise<TreeViewNode[]>;
    onNodeSelect?: (id: string) => void;
}

const BaseTreeView: React.FC<TreeViewProps> = ({ className, root, findNodes, onNodeSelect }) => {
    return (
        <MUITreeView
            className={className}
            defaultCollapseIcon={<CloseIcon />}
            defaultExpandIcon={<OpenIcon />}
            onNodeSelect={
                onNodeSelect
                    ? (_event: React.ChangeEvent<{}>, value: string) => onNodeSelect(value)
                    : undefined
            }
        >
            <TreeItem node={root} findNodes={findNodes} />
        </MUITreeView>
    );
};

export const TreeView = styled(BaseTreeView)`
    flex-grow: 1;
    padding: 10px;
`;

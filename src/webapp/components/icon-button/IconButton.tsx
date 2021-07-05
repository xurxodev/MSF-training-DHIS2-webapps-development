import { Icon, IconButton as MUIIconButton, Tooltip } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

export const IconButton: React.FC<IconButtonProps> = React.memo(
    ({ tooltip, icon, color, onClick }) => {
        return (
            <Tooltip title={tooltip} placement="top">
                <StyledIconButton onClick={onClick}>
                    <Icon color={color}>{icon}</Icon>
                </StyledIconButton>
            </Tooltip>
        );
    }
);

export const StyledIconButton = styled(MUIIconButton)`
    padding: 0;
    padding-left: 10px;
`;

export interface IconButtonProps {
    tooltip: string;
    icon: string;
    color?: "inherit" | "primary" | "secondary" | "default" | "action" | "disabled" | "error";
    onClick?: () => void;
}

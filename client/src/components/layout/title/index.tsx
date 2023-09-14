import React from "react";
import { useRouterContext, TitleProps } from "@refinedev/core";
import Button from "@mui/material/Button";

import { immobilier, realstate } from "assets";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <Button fullWidth variant="text" disableRipple>
            <Link to="/">
                {collapsed ? (
                    <img src={realstate} alt="Real State" width="50px"/>
                ) : (
                    <img src={immobilier} alt="Immobilier" width="90px" />
                )}
            </Link>
        </Button>
    );
};

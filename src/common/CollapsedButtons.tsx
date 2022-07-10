import {Box, Collapse, IconButton, IconButtonProps} from "@mui/material";
import {styled} from "@mui/material/styles";
import React from "react";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand,children, ...other} = props;
    return <IconButton {...other} >{children}</IconButton>;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginRight: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


type CollapsedButtonsProps = {
    children?: React.ReactNode
    expandIcon: React.ReactNode
}

export const CollapsedButtons: React.FC<CollapsedButtonsProps> = ({children, expandIcon}) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    return (
        <Box sx={{display: "flex", flexDirection: 'column',}}>
            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                {expandIcon}
            </ExpandMore>
            <Collapse in={expanded}
                      timeout="auto"
                      unmountOnExit

            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'end',
                    alignItems: 'end',

                }}>
                    {children}

                </Box>
            </Collapse>
        </Box>
    )
}
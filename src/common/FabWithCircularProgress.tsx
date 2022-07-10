import React, {ReactElement} from "react";
import {blue} from "@mui/material/colors";
import {Box, CircularProgress, Fab} from "@mui/material";

type CircularIntegrationPropsType = {
    callback: () => void
    isProgress: boolean
    children: React.ReactNode
    color: "secondary" | "default" | "success" | "inherit" | "warning" | "error" | "primary" | "info"
}
export const FabWithCircularProgress: React.FC<CircularIntegrationPropsType> = React.memo(({
                                                                                               callback,
                                                                                               color,
                                                                                               children,
                                                                                               isProgress
                                                                                           }) => {


        const buttonSx = {
            ...(isProgress && {
                bgcolor: blue[900],
                '&:hover': {
                    bgcolor: blue[900],
                },
            }),
        };


        const handleButtonClick = () => {
            callback()
        };

        return (

            <Box sx={{m: 1, position: 'relative'}}>
                <Fab
                    aria-label="save"
                    size='small'
                    color={color}
                    sx={buttonSx}
                    disabled={isProgress}
                    onClick={handleButtonClick}
                >
                    {children}
                </Fab>
                {isProgress && (
                    <CircularProgress
                        size={48}
                        sx={{
                            color: blue[500],
                            position: 'absolute',
                            top: -4,
                            left: -4,
                            zIndex: 1,
                        }}
                    />
                )}
            </Box>
        )
    }
)
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Typography} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import {CreateToDoInputWrapper} from "../CreateToDoInputWrapper";

export const AccordionWrapper: React.FC = React.memo(() => {

        return (
            <>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>New Todo</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component={'div'}>

                            <CreateToDoInputWrapper/>

                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </>
        )
    }
)
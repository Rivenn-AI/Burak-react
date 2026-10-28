import React, { useState } from "react";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TabPanel from "@mui/lab/TabPanel";
import { faq } from "../../../lib/data/faq";

export default function FaqPage() {
  // index of the opened question, false = all closed
  const [expanded, setExpanded] = useState<number | false>(0);

  const handleChange =
    (index: number) => (e: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? index : false);
    };

  return (
    <TabPanel value={"2"}>
      <Box className={"faq-card"}>
        {faq.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            className={"faq-accordion"}
            disableGutters
            square
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-${index}-content`}
              id={`faq-${index}-header`}
            >
              <span className={"faq-question"}>{item.question}</span>
            </AccordionSummary>
            <AccordionDetails>
              <span className={"faq-answer"}>{item.answer}</span>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </TabPanel>
  );
}

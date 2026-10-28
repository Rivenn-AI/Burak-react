import React from "react";
import { Box } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { terms } from "../../../lib/data/terms";

export default function TermsPage() {
  return (
    <TabPanel value={"1"}>
      <Box className={"terms-card"}>
        {terms.map((text, index) => (
          <Box key={index} className={"terms-row"}>
            {text}
          </Box>
        ))}
      </Box>
    </TabPanel>
  );
}

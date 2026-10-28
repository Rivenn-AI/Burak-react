import React, { SyntheticEvent, useState } from "react";
import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TermsPage from "./TermsPage";
import FaqPage from "./FaqPage";
import ContactPage from "./ContactPage";
import "../../../css/help.css";

export default function HelpPage() {
  const [value, setValue] = useState("1");

  /** HANDLERS **/
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"help-page"}>
      <Container className={"help-container"}>
        <TabContext value={value}>
          <Box className={"help-nav-frame"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                className={"table_list"}
              >
                <Tab label="TERMS" value={"1"} />
                <Tab label="FAQ" value={"2"} />
                <Tab label="CONTACT" value={"3"} />
              </Tabs>
            </Box>
          </Box>

          <Stack className={"help-main-content"}>
            <TermsPage />
            <FaqPage />
            <ContactPage />
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}

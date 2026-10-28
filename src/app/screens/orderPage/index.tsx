import React, { SyntheticEvent, useState } from "react";
import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";

export default function OrdersPage() {
  const [value, setValue] = useState("1");

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"order-page"}>
      <Container className="order-container">
        <Stack className={"order-left"}>
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"table_list"}
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order-right"}>
          {/* ---- member info box (top part SEEN, location row GUESSED) ---- */}
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img
                  src={"/icons/default-user.svg"}
                  className={"order-user-avatar"}
                />
                <div className={"order-user-icon-box"}>
                  <img
                    src={"/icons/user-badge.svg"}
                    className={"order-user-prof-img"}
                  />
                </div>
              </div>
              <span className={"order-user-name"}>Martin</span>
              <span className={"order-user-prof"}>User</span>
            </Box>
            <Box className={"liner"}></Box>
            <Box className={"order-user-address"}>
              <LocationOnIcon />
              <div className={"spec-address-txt"}>Busan</div>
            </Box>
          </Box>

          {/* ---- card box (GUESSED from the screenshot) ---- */}
          <Box className={"order-info-box"}>
            <Box className={"cards-input"}>
              <div className={"card-input-box"}>
                <input
                  type="text"
                  placeholder={"Card number : **** 4090 2002 7495"}
                />
              </div>
              <div className={"card-half-input-frame"}>
                <div className={"card-input-box"}>
                  <input type="text" placeholder={"07 / 24"} />
                </div>
                <div className={"card-input-box"}>
                  <input type="text" placeholder={"CVV : 010"} />
                </div>
              </div>
              <div className={"card-input-box"}>
                <input type="text" placeholder={"Justin Robertson"} />
              </div>
            </Box>
            <Box className={"cards-logos"}>
              <img src={"/icons/western-card.svg"} alt="Western Union" />
              <img src={"/icons/master-card.svg"} alt="MasterCard" />
              <img src={"/icons/paypal-card.svg"} alt="PayPal" />
              <img src={"/icons/visa-card.svg"} alt="Visa" />
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}

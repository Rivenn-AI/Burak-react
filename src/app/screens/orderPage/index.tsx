import React, { SyntheticEvent, useEffect, useState } from "react";
import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPousedOrders, setFinishedOrders, setProcessOrders } from "./slice";
import "../../../css/order.css";
import { Order, OrderInquiry } from "../../../lib/types/orders";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { MemberType } from "../../../lib/enums/member.enum";
import { serverApi } from "../../../lib/config";

/**REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPousedOrders: (data: Order[]) => dispatch(setPousedOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
});

export default function OrdersPage() {
  const dispatch = useDispatch();

  const { setFinishedOrders, setPousedOrders, setProcessOrders } =
    actionDispatch(dispatch);
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 3,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPousedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  if (!authMember) history.push("/");

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
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
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
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  className={"order-user-avatar"}
                />
                <div className={"order-user-icon-box"}>
                  <img
                    src={
                      authMember?.memberType === MemberType.RESTAURANT
                        ? "/icons/restaurant.svg"
                        : "/icons/user-badge.svg"
                    }
                    className={"order-user-prof-img"}
                  />
                </div>
              </div>
              <span className={"order-user-name"}>
                {authMember?.memberNick}
              </span>
              <span className={"order-user-prof"}>
                {authMember?.memberType === MemberType.USER}
              </span>
            </Box>
            <Box className={"liner"}></Box>
            <Box className={"order-user-address"}>
              <LocationOnIcon />
              <div className={"spec-address-txt"}>
                {" "}
                {authMember?.memberAddress
                  ? authMember.memberAddress
                  : "no address"}
              </div>
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

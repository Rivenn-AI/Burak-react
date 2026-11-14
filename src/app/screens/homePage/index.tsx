import React, { useEffect } from "react";
import { Event } from "@mui/icons-material";
import { Container } from "@mui/material";
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import Events from "./Events";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import Statistics from "./Statistics";
import "../../../css/home.css";
export default function HomePage() {
  //Selector: Store => Data

  useEffect(() => {
    //Backent server data request =>DATA
    //slice: Data=>Store
  }, []);
  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}

import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

/**Redux Store ichida juda ko'p ma'lumotlar bo'lishi mumkin.
 * Selector'ning vazifasi — butun global state ichidan aynan
 * bizga kerakli qismini tanlab ajratib berish: */

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrievePopularDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularDishes,
);
// *** 5 ***  Store'dagi ro'yxatni ajratib oladi

export const retrievNewDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newDishes,
);

export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers,
);

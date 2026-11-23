import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

/**Redux Store ichida juda ko'p ma'lumotlar bo'lishi mumkin.
 * Selector'ning vazifasi — butun global state ichidan aynan
 * bizga kerakli qismini tanlab ajratib berish: */

const selectOrdersPage = (state: AppRootState) => state.ordersPage;

export const retrievePausedorders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.pausedOrders,
);

export const retrieveProcessOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.processOrders,
);

export const retrieveFinishedOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.finishedOrders,
);

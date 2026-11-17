import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrievRestaurant = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.restaurant,
);
export const retrievProducts = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.products,
);
export const retrievChoesnProduct = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.chosenProduct,
);

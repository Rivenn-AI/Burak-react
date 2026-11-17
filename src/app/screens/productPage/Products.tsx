import React, { ChangeEvent, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { setProducts } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { retrievProducts } from "./selecter";
import { useEffect } from "react";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

/**REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrievProducts, (products) => ({
  products,
}));

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, [productSearch]);
  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);
  /** HANDELLERS */
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products-page"}>
      <div className={"products"}>
        <Container>
          <Stack flexDirection={"column"} alignItems={"center"}>
            {/* ---- avatar-big-box (collapsed in your video: GUESSED) ---- */}
            <Stack className={"avatar-big-box"}>
              <Stack className={"top-text"}>
                <Box className={"title"}>Burak Restaurant</Box>
                <Stack className={"search-box"}>
                  <input
                    type="text"
                    name="singleResearch"
                    className={"search-input"}
                    placeholder={"Type here"}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") searchProductHandler();
                    }}
                  />
                  {searchText && (
                    <button
                      className="clear-search-btn"
                      onClick={() => setSearchText("")}
                      type="button"
                    >
                      ×
                    </button>
                  )}
                  <Button
                    className={"search-btn"}
                    variant={"contained"}
                    color={"primary"}
                    endIcon={<SearchIcon />}
                    onClick={searchProductHandler}
                  >
                    Search
                  </Button>
                </Stack>
              </Stack>
            </Stack>

            {/* ---- dishes-filter-section (visible in your video) ---- */}
            <Stack className={"dishes-filter-section"}>
              <Stack className={"dishes-filter-box"}>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.order === "createdAt"
                      ? "primary"
                      : "secondary"
                  }
                  className={"order"}
                  onClick={() => searchOrderHandler("createdAt")}
                >
                  New
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.order === "productPrice"
                      ? "primary"
                      : "secondary"
                  }
                  className={"order"}
                  onClick={() => searchOrderHandler("productPrice")}
                >
                  Price
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.order === "productViews"
                      ? "primary"
                      : "secondary"
                  }
                  className={"order"}
                  onClick={() => searchOrderHandler("productViews")}
                >
                  Views
                </Button>
              </Stack>
            </Stack>

            {/* ---- list-category-section (visible in your video) ---- */}
            <Stack className={"list-category-section"}>
              <Stack className={"product-category"}>
                <div className={"category-main"}>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.OTHER
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollectionHandler(ProductCollection.OTHER)
                    }
                  >
                    Other
                  </Button>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.DESSERT
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollectionHandler(ProductCollection.DESSERT)
                    }
                  >
                    Dessert
                  </Button>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.DRINK
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollectionHandler(ProductCollection.DRINK)
                    }
                  >
                    Drink
                  </Button>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.SALAD
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollectionHandler(ProductCollection.SALAD)
                    }
                  >
                    Salad
                  </Button>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection === ProductCollection.DISH
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollectionHandler(ProductCollection.DISH)
                    }
                  >
                    Dish
                  </Button>
                </div>
              </Stack>

              <Stack className={"product-wrapper"}>
                {products.length !== 0 ? (
                  products.map((product: Product) => {
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    const sizeVolume =
                      product.productCollection === ProductCollection.DRINK
                        ? product.productVolume + "litre"
                        : product.productSize + "size";
                    return (
                      <Stack
                        key={product._id}
                        className={"product-card"}
                        onClick={() => chooseDishHandler(product._id)}
                      >
                        <Stack
                          className={"product-img"}
                          sx={{ backgroundImage: `url(${imagePath})` }}
                        >
                          <div className={"product-sale"}>{sizeVolume}</div>
                          <Button className={"shop-btn"}>
                            <img
                              src={"/icons/shopping-cart.svg"}
                              style={{ display: "flex" }}
                            />
                          </Button>
                          <Button className={"view-btn"} sx={{ right: "36px" }}>
                            <Badge
                              badgeContent={product.productViews}
                              color="secondary"
                            >
                              <RemoveRedEyeIcon
                                sx={{
                                  color:
                                    product.productViews === 0
                                      ? "gray"
                                      : "white",
                                }}
                              />
                            </Badge>
                          </Button>
                        </Stack>
                        <Box className={"product-desc"}>
                          <span className={"product-title"}>
                            {product.productName}
                          </span>
                          <div className={"product-price"}>
                            <MonetizationOnIcon />
                            {product.productPrice}
                          </div>
                        </Box>
                      </Stack>
                    );
                  })
                ) : (
                  <Box className="no-data">Products are not available!</Box>
                )}
              </Stack>
            </Stack>

            {/* ---- pagination-section (visible in your video) ---- */}
            <Stack className={"pagination-section"}>
              <Pagination
                count={
                  products.length !== 0
                    ? productSearch.page + 1
                    : productSearch.page
                }
                page={productSearch.page}
                renderItem={(item) => (
                  <PaginationItem
                    components={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                    color={"secondary"}
                  />
                )}
                onChange={paginationHandler}
              />
            </Stack>
          </Stack>
        </Container>

        {/* ---- brands-logo (collapsed in your video: GUESSED from the screenshot) ---- */}
        <div className={"brands-logo"}>
          <Container>
            <Stack className={"brands-area"}>
              <Box className={"category-title"}>Our Family Brands</Box>
              <Stack className={"brand-list"}>
                <Box className={"brand-card"}>
                  <img src={"/img/gurme.webp"} alt="Burak Gurme" />
                </Box>
                <Box className={"brand-card"}>
                  <img src={"/img/sweets.webp"} alt="Burak Sweets" />
                </Box>
                <Box className={"brand-card"}>
                  <img src={"/img/seafood.webp"} alt="Burak Seafood" />
                </Box>
                <Box className={"brand-card"}>
                  <img src={"/img/doner.webp"} alt="Burak Doner" />
                </Box>
              </Stack>
            </Stack>
          </Container>
        </div>

        {/* ---- address (visible in your video) ---- */}
        <div className={"address"}>
          <Container>
            <Stack className={"address-area"}>
              <Box className={"title"}>Our address</Box>
              <iframe
                style={{ marginTop: "60px" }}
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d380717.11119594605!2d-70.5882922!3d41.7991677!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e4c6127cc5b685%3A0x104d337439f46ea9!2sWalmart+Supercenter!5e0!3m2!1sen!2sus!4v1445294674664"
                width="1320"
                height="500"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Stack>
          </Container>
        </div>
      </div>
    </div>
  );
}

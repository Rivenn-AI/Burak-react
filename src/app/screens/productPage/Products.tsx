import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const products = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];

// NOTE: your screenshots show the CSS root as ".products-page" and the JSX root
// as ".products". I wrap both here so this file works on its own. If your router
// layout already provides <div className="products-page">, remove the outer div.
export default function Products() {
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
                  />
                  <Button
                    className={"search-btn"}
                    variant={"contained"}
                    color={"primary"}
                    endIcon={<SearchIcon />}
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
                  color={"primary"}
                  className={"order"}
                >
                  New
                </Button>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  className={"order"}
                >
                  Price
                </Button>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  className={"order"}
                >
                  Views
                </Button>
              </Stack>
            </Stack>

            {/* ---- list-category-section (visible in your video) ---- */}
            <Stack className={"list-category-section"}>
              <Stack className={"product-category"}>
                <div className={"category-main"}>
                  <Button variant={"contained"} color={"secondary"}>
                    Other
                  </Button>
                  <Button variant={"contained"} color={"secondary"}>
                    Dessert
                  </Button>
                  <Button variant={"contained"} color={"secondary"}>
                    Drink
                  </Button>
                  <Button variant={"contained"} color={"secondary"}>
                    Salad
                  </Button>
                  <Button variant={"contained"} color={"primary"}>
                    Dish
                  </Button>
                </div>
              </Stack>

              <Stack className={"product-wrapper"}>
                {products.length !== 0 ? (
                  products.map((product, index) => {
                    return (
                      <Stack key={index} className={"product-card"}>
                        <Stack
                          className={"product-img"}
                          sx={{ backgroundImage: `url(${product.imagePath})` }}
                        >
                          <div className={"product-sale"}>Normal size</div>
                          <Button className={"shop-btn"}>
                            <img
                              src={"/icons/shopping-cart.svg"}
                              style={{ display: "flex" }}
                            />
                          </Button>
                          <Button className={"view-btn"} sx={{ right: "36px" }}>
                            <Badge badgeContent={20} color="secondary">
                              <RemoveRedEyeIcon
                                sx={{
                                  color: 20 ? "gray" : "white",
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
                            {12}
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
                count={3}
                page={1}
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

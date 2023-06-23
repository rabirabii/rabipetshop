import "./Navbar.scss";
import Hidden from "@mui/material/Hidden";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Typography, Box, Badge, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { Transition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../Cart";
import Wishlist from "../Wishlist";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import "./cobaa.css";
import FlexBetween from "components/FlexBetween";
import styles from "../../styles/styles";
import { IoIosArrowForward } from "react-icons/io";
import MenuIcon from "@mui/icons-material/Menu";
import {
  HelpOutlineOutlined,
  HomeOutlined,
  InfoOutlined,
  MessageOutlined,
  QuestionAnswerRounded,
  QuestionMarkOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
const Cobaa = () => {
  const [categoryAnchorEl, setCategoryAnchorEl] = React.useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = React.useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const handleCategoryMenuOpen = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleCategoryMenuClose = () => {
    setCategoryAnchorEl(null);
  };

  const handleAccountMenuOpen = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountAnchorEl(null);
  };

  const anchorTransitionProps = {
    in: Boolean(categoryAnchorEl || accountAnchorEl),
    timeout: {
      enter: 300,
      exit: 200,
    },
    mountOnEnter: true,
    unmountOnExit: true,
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  return (
    <container maxwidth="lg">
      <header className="main-header">
        <div className="header-content">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Hidden mdUp>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={handleCategoryMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={categoryAnchorEl}
                open={Boolean(categoryAnchorEl)}
                onClose={handleCategoryMenuClose}
              >
                {/* Category menu items */}
                <MenuItem onClick={handleCategoryMenuClose}>
                  <HomeOutlined fontSize="small" />
                  <Link to={"/"} style={{ color: "black" }}>
                    Home
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCategoryMenuClose}>
                  <InfoOutlined fontSize="small" />
                  <Link to={"/about"} style={{ color: "black" }}>
                    About
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCategoryMenuClose}>
                  <ShoppingBagOutlined fontSize="small" />
                  <Link to={"/products"} style={{ color: "black" }}>
                    Products
                  </Link>
                </MenuItem>
                <MenuItem>
                  <HelpOutlineOutlined fontSize="small" />
                  <Link to={"/faqAll"} style={{ color: "black" }}>
                    FAQ
                  </Link>
                </MenuItem>
                {isAuthenticated && (
                  <MenuItem onClick={handleCategoryMenuClose}>
                    <MessageOutlined fontSize="small" />
                    <Link to={"/konsultasi"} style={{ color: "black" }}>
                      Konsultasi
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            </Hidden>

            <ul className="left">
              <li onClick={() => navigate("/")}>
                <Link to={"/"} style={{ color: "black" }}>
                  Home
                </Link>
              </li>
              <li onClick={() => navigate("/about")}>
                <Link to={"/about"} style={{ color: "black" }}>
                  About
                </Link>
              </li>
              <li>
                <Link to={"/products"} style={{ color: "black" }}>
                  Products
                </Link>
              </li>
              <li>
                <Link to={"/faqAll"} style={{ color: "black" }}>
                  FAQ
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link to={"/konsultasi"} style={{ color: "black" }}>
                    Konsultasi
                  </Link>
                </li>
              )}
            </ul>
          </Box>
          <div className="center" onClick={() => navigate("/")}>
            Smart pet Petshop
          </div>
          <div className="right">
            <span
              className="wishlist-icon ml-4"
              onClick={() => setOpenWishlist(true)}
            >
              <Badge badgeContent={wishlist && wishlist.length}>
                <FavoriteBorderOutlinedIcon color="action" />
              </Badge>
            </span>
            <span className="cart-icon ml-4" onClick={() => setOpenCart(true)}>
              <Badge badgeContent={cart && cart.length}>
                <ShoppingCartOutlinedIcon color="action" />
              </Badge>
            </span>
            <div className={`cart-popup ${openCart ? "open-cart" : ""}`}>
              <Cart setOpenCart={setOpenCart} />
            </div>
            {/* wishlist popup */}
            <div className={`wishlist-popup ${openWishlist ? "open" : ""}`}>
              <Wishlist setOpenWishlist={setOpenWishlist} />
            </div>

            <FlexBetween>
              <Button
                aria-haspopup="true"
                onClick={handleAccountMenuOpen}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                }}
              >
                {isAuthenticated ? (
                  <>
                    <Box
                      component="img"
                      alt="profile"
                      src={`${backend_url}${user?.avatar}`}
                      height="50px"
                      width="50px"
                      borderRadius="50%"
                      sx={{ objectFit: "cover" }}
                    />
                    <Box textAlign="left">
                      <Typography
                        fontWeight="bold"
                        fontSize="1rem"
                        color="black"
                      >
                        Hello, {user.name}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <Hidden smDown>
                    <Button component={Link} to="/login">
                      Login
                    </Button>
                    <Button component={Link} to="/sign-up">
                      Register
                    </Button>
                  </Hidden>
                )}
              </Button>

              <Transition {...anchorTransitionProps}>
                {(state) => (
                  <Menu
                    anchorEl={accountAnchorEl}
                    open={Boolean(accountAnchorEl)}
                    onClose={handleAccountMenuClose}
                    TransitionComponent={Slide}
                    TransitionProps={{
                      direction: "down",
                      timeout: 200,
                    }}
                    className={`transition-${state}`}
                  >
                    {isAuthenticated && (
                      <>
                        <MenuItem
                          onClick={handleAccountMenuClose}
                          component={Link}
                          to="/MyProfilePage"
                        >
                          Profile
                        </MenuItem>
                        <MenuItem onClick={handleAccountMenuClose}>
                          <Button onClick={logoutHandler}>Logout</Button>
                        </MenuItem>
                      </>
                    )}
                  </Menu>
                )}
              </Transition>
            </FlexBetween>
            <Hidden smDown></Hidden>
          </div>
        </div>
      </header>
    </container>
  );
};

export default Cobaa;

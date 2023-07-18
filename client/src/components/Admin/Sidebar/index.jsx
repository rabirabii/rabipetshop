import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../ColorToken";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateUserInformation,
  loadSeller,
} from "../../../redux/actions/user";
import axios from "axios";
import { server, backend_url } from "../../../server";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  AddCircleOutline,
  AssignmentReturnOutlined,
  Camera,
  CelebrationOutlined,
  DirectionsBikeOutlined,
  DiscountOutlined,
  EditOutlined,
  LogoutOutlined,
  MessageOutlined,
  PasswordOutlined,
  SettingsOutlined,
  ShoppingBagOutlined,
  ShoppingCartCheckoutOutlined,
} from "@mui/icons-material";
// import tema from "../../../theme";
import { HiOutlineReceiptRefund } from "react-icons/hi";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { seller } = useSelector((state) => state.seller);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    axios
      .get(`${server}/shop/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/shop-login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/shop/update-shop-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(loadSeller());
        toast.success("avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color={colors.grey[100]}>
                  Rabi Petshop🐇
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`${backend_url}${seller?.avatar}`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <Camera />
                </label>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {seller.name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {seller.phoneNumber}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Product
            </Typography>
            <Item
              title="All Orders"
              to="/dashboard-orders"
              icon={<ShoppingBagOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="All Products"
              to="/dashboard-products"
              icon={<ShoppingCartCheckoutOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create Products"
              to="/dashboard-create-product"
              icon={<AddCircleOutline />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Update Products"
              to="/dashboard-update-product/:id"
              icon={<EditOutlined />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Refunds"
              to="/dashboard-refunds"
              icon={<AssignmentReturnOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Discount Codes"
              to="/dashboard-coupons"
              icon={<DiscountOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Event
            </Typography>
            <Item
              title="All Events"
              to="/dashboard-events"
              icon={<CelebrationOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create Event"
              to="/dashboard-create-event"
              icon={<AddCircleOutline />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Other
            </Typography>
            <Item
              title="Inbox"
              to="/dashboard-messages"
              icon={<MessageOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Settings"
              to="/settings"
              icon={<SettingsOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              onClick={logoutHandler}
              title="Logout"
              cursor="pointer"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px", cursor: "pointer" }}
            >
              Logout
            </Typography>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

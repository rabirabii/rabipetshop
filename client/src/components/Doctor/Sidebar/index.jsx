import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../ColorToken";
import {
  HomeOutlined,
  PersonOutline,
  MenuOutlined,
  MessageOutlined,
  PasswordOutlined,
  LogoutOutlined,
  ChangeCircleOutlined,
} from "@mui/icons-material";
import { loadDoctor, updateDoctorInformation } from "redux/actions/doctor";
import axios from "axios";
import { server, backend_url } from "../../../server";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

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

const SidebarDoctor = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Profile Page");
  const navigate = useNavigate();
  const { doctor } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    axios
      .get(`${server}/doctor/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/doctor-login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
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
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlined /> : undefined}
            styles={{
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
                <Typography variant="h4" color={colors.grey[100]}>
                  Doctor Page
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  className="w-[150px] h-[150px] rounded-full "
                  src={`${backend_url}${doctor?.avatar}`}
                  style={{ cursor: "ponter", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {doctor.name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {doctor.speciality}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Profile"
              to="/doctor-profile"
              icon={<PersonOutline />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Change Password"
              to="/change-password-doctor"
              icon={<ChangeCircleOutlined />}
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
              to="/inbox-doctor"
              icon={<MessageOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              cursor="pointer"
              onClick={logoutHandler}
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Logout
            </Typography>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SidebarDoctor;

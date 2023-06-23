import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./dashboard.css";
import Sidebar from "components/Admin/Sidebar";
import Navbar from "components/Admin/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Orders from "components/Admin/Orders";
import { ColorModeContext, useMode } from "ColorToken";
const AllOrdersPage = () => {
  const mode = useSelector((state) => state.global.mode);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="allOrders">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Navbar setIsSidebar={setIsSidebar} />
            <Orders />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AllOrdersPage;

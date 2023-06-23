import React, { useState } from "react";
import { useSelector } from "react-redux";
import OrderDetails from "components/Admin/OrderDetails";
import "./dashboard.css";
import Sidebar from "components/Admin/Sidebar";
import Navbar from "components/Admin/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "ColorToken";
const OrderDetailsPage = () => {
  const mode = useSelector((state) => state.global.mode);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="orderDetails">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Navbar setIsSidebar={setIsSidebar} />
            <OrderDetails />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default OrderDetailsPage;

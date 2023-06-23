import React, { useState } from "react";

import { useSelector } from "react-redux";
import DashboardComponent from "components/Admin/DashboardHero";
import "./dashboard.css";
import Sidebar from "components/Admin/Sidebar";
import Navbar from "components/Admin/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "ColorToken";
const Dashboard = () => {
  const mode = useSelector((state) => state.global.mode);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="dashboard">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Navbar setIsSidebar={setIsSidebar} />
            <DashboardComponent />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Dashboard;

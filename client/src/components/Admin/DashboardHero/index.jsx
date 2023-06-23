import React, { useEffect, useState } from "react";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop, getOrdersByDate } from "redux/actions/order";
import { getAllProductsShop } from "redux/actions/product";
import { Button, Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "ColorToken";
import Header from "../Header";
import { ResponsiveBar } from "@nivo/bar";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const [incomeData, setIncomeData] = useState([]);
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const [selectedDate, setSelectedDate] = useState("");

  // Fungsi untuk menghandle perubahan tanggal
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const availableBalance = seller?.availableBalance;

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Quantity",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Preview",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <ArrowRightAltOutlined style={{ color: colors.grey[100] }} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "Rp." + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="min-h-[20vh] rounded p-4 flex items-center bg-primary">
          <AiOutlineMoneyCollect
            size={30}
            className="mr-2 text-grey-100"
            style={{ color: colors.grey[100] }}
          />
          <div>
            <h3
              className={`${styles.productTitle} text-[18px] leading-5 font-400 text-grey-100`}
              style={{ color: colors.grey[100] }}
            >
              Account Balance{" "}
              <span className="text-[12px]">(with 10% service charge)</span>
            </h3>
            <h5
              className="pt-2 text-[22px] font-500 text-greenAccent-500"
              style={{ color: colors.greenAccent[600] }}
            >
              Rp.{availableBalance}
            </h5>
            {/* <Link to="/dashboard-withdraw-money">
              <h5 className="pt-4 pl-2">Withdraw Money</h5>
            </Link> */}
          </div>
        </div>

        <div className="min-h-[20vh]  p-4 flex items-center bg-primary">
          <MdBorderClear size={30} className="mr-2 text-grey-100" />
          <div>
            <h3
              className={`${styles.productTitle} text-[18px] leading-5 font-400 text-grey-100`}
              style={{ color: colors.grey[100] }}
            >
              All Orders
            </h3>
            <h5
              className="pt-2 text-[22px] font-500 text-greenAccent-500"
              style={{ color: colors.greenAccent[600] }}
            >
              {orders && orders.length}
            </h5>
            <Link to="/dashboard-orders">
              <h5
                className="pt-4 pl-2 text-grey-100"
                style={{ color: colors.grey[100] }}
              >
                View Orders
              </h5>
            </Link>
          </div>
        </div>

        <div className="min-h-[20vh] d p-4 flex items-center">
          <AiOutlineMoneyCollect size={30} className="mr-2 text-grey-100" />
          <div>
            <h3
              className={`${styles.productTitle} text-[18px] leading-5 font-400 text-grey-100`}
              style={{ color: colors.grey[100] }}
            >
              All Products
            </h3>
            <h5
              className="pt-2 text-[22px] font-500 text-greenAccent-500"
              style={{ color: colors.greenAccent[600] }}
            >
              {products && products.length}
            </h5>
            <Link to="/dashboard-products">
              <h5
                className="pt-4 pl-2 text-grey-100"
                tyle={{ color: colors.grey[100] }}
              >
                View Products
              </h5>
            </Link>
          </div>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] pb-2">Latest Orders</h3>
      <div className="w-full min-h-[45vh]">
        <Box m="1.5rem 2.rem">
          <Header title="Orders" subtitle="List of Orders" />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid rows={row} columns={columns} pageSize={10} autoHeight />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default DashboardHero;

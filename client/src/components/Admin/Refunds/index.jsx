import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../ColorToken";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../components/Admin/Header";
import { getAllOrdersOfShop } from "../../../redux/actions/order";
import { deleteProduct } from "../../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutline, Print, VisibilityOutlined } from "@mui/icons-material";
import Loader from "components/Loader";
import {
  PDFDownloadLink,
  PDFViewer,
  Document,
  Page,
  Text,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import { AiOutlineArrowRight } from "react-icons/ai";
const Refunds = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const refundOrders =
    orders &&
    orders.filter(
      (item) =>
        item.status === "Processing refund" || item.status === "Refund Success"
    );

  // Define PDF Document
  const MyDocument = () => (
    <Document>
      <Page>
        <View style={styles.header}>
          <Text style={styles.headerText}>Refund Reports</Text>
        </View>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Status</Text>
            <Text style={styles.tableCell}>Items Qty</Text>
            <Text style={styles.tableCell}>Total Price</Text>
            <Text style={styles.tableCell}>Product Sales</Text>
          </View>
          {refundOrders &&
            refundOrders.map((refund) => (
              <View style={styles.tableRow} key={refund.id}>
                <Text style={styles.tableCell}>{refund.cart.length}</Text>
                <Text style={styles.tableCell}>Rp. {refund.totalPrice}</Text>
                <Text style={styles.tableCell}>{refund.status}</Text>
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
  const styles = StyleSheet.create({
    header: {
      marginBottom: 10,
      padding: 10,
      backgroundColor: "#f0f0f0",
      flexDirection: "row",
      justifyContent: "center",
    },
    headerText: {
      fontSize: 18,
      fontWeight: "bold",
    },
    table: { display: "table", width: "100%", marginTop: 10 },
    tableRow: { flexDirection: "row" },
    tableCell: {
      flexGrow: 1,
      fontSize: 12,
      padding: "4px 8px",
      fontFamily: "Helvetica",
    },
    tableHeader: { backgroundColor: "#f0f0f0", fontWeight: "bold" },
  });

  // Render PDF Download link
  const handleDownloadPDF = () => (
    <PDFDownloadLink document={<MyDocument />} fileName="products.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document ..." : "Download PDF"
      }
    </PDFDownloadLink>
  );
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

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
      headerName: "Items Qty",
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
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight
                  size={20}
                  style={{ color: colors.grey[100] }}
                />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const row = [];

  refundOrders &&
    refundOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <Box m="1.5rem 2.rem">
      <Header title="Refunds" subtitle="List of Refunds" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[1100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            // backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[1100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            // color: `${theme.palette.secondary[1200]} !important`,
          },
        }}
      >
        <Box mb={2}>
          <Button style={{ color: colors.grey[100] }}>
            <Print />
            {handleDownloadPDF()}
          </Button>
        </Box>
        <DataGrid rows={row} columns={columns} pageSize={10} autoHeight />
      </Box>
    </Box>
  );
};

export default Refunds;

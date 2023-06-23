import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../ColorToken";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../components/Admin/Header";
import { deleteEvent, getAllEventsShop } from "redux/actions/event";
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
import {
  AiOutlineArrowRight,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";
const Events = () => {
  const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
    window.location.reload();
  };
  const MyDocument = () => (
    <Document>
      <Page>
        <View style={styles.header}>
          <Text style={styles.headerText}>Event Reports</Text>
        </View>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Product Name</Text>
            <Text style={styles.tableCell}>Product Price</Text>
            <Text style={styles.tableCell}>Product Stock</Text>
            <Text style={styles.tableCell}>Product Sales</Text>
          </View>
          {events &&
            events.map((event) => (
              <View style={styles.tableRow} key={event.id}>
                <Text style={styles.tableCell}>{event.name}</Text>
                <Text style={styles.tableCell}>Rp. {event.discountPrice}</Text>
                <Text style={styles.tableCell}>{event.stock}</Text>
                <Text style={styles.tableCell}>{event?.sold_out}</Text>
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
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      headerName: "Preview",
      minWidth: 80,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <VisibilityOutlined style={{ color: colors.grey[100] }} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.3,
      minWidth: 80,
      headerName: "Delete Product",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <DeleteOutline style={{ color: colors.grey[100] }} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "Rp. " + item.discountPrice,
        Stock: item.stock,
        sold: item.sold_out,
      });
    });

  return (
    <Box m="1.5rem 2.rem">
      <Header title="Events" subtitle="List of Events" />
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

export default Events;

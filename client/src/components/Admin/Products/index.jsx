import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  TextField,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { tokens } from "../../../ColorToken";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../components/Admin/Header";
import { getAllProductsShop } from "../../../redux/actions/product";
import { deleteProduct, updateProduct } from "../../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  DeleteOutline,
  Edit,
  EditOutlined,
  Print,
  VisibilityOutlined,
} from "@mui/icons-material";
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
import { backend_url, server } from "../../../server";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleDeleteConfirmationOpen = (id) => {
    setSelectedProductId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setSelectedProductId(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteProduct(selectedProductId));
    handleDeleteConfirmationClose();
    window.location.reload();
  };

  const handleUpdate = (id, field, value) => {
    const updatedData = {
      [field]: value,
    };
    dispatch(updateProduct(id, updatedData));
  };

  // Define PDF Document
  const MyDocument = () => (
    <Document>
      <Page>
        <View style={styles.header}>
          <Text style={styles.headerText}>Products Reports</Text>
        </View>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Product Name</Text>
            <Text style={styles.tableCell}>Product Price</Text>
            <Text style={styles.tableCell}>Product Stock</Text>
            <Text style={styles.tableCell}>Product Sales</Text>
          </View>
          {products &&
            products.map((product) => (
              <View style={styles.tableRow} key={product.id}>
                <Text style={styles.tableCell}>{product.name}</Text>
                <Text style={styles.tableCell}>
                  Rp. {product.discountPrice}
                </Text>
                <Text style={styles.tableCell}>{product.stock}</Text>
                <Text style={styles.tableCell}>{product?.sold_out}</Text>
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
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 150,
      flex: 0.7,
      hidden: true,
    },
    { field: "name", headerName: "Product Name", minWidth: 180, flex: 1 },
    { field: "price", headerName: "Product Price", minWidth: 100, flex: 0.7 },
    { field: "stock", headerName: "Product Stock", minWidth: 80, flex: 0.5 },
    { field: "sold", headerName: "Product Sales", minWidth: 130, flex: 0.6 },
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
            <Button onClick={() => handleDeleteConfirmationOpen(params.id)}>
              <DeleteOutline style={{ color: colors.grey[100] }} />
            </Button>
          </>
        );
      },
    },
    {
      field: "Edit",
      flex: 0.3,
      minWidth: 80,
      headerName: "Edit Product",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard-update-product/${params.id}`}>
              <Button onClick={() => handleUpdate(params.id)}>
                <EditOutlined style={{ color: colors.grey[100] }} />{" "}
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "Rp." + item.discountPrice,
        stock: item.stock,
        sold: item?.sold_out,
      });
    });
  return (
    <Box m="1.5rem 2.rem">
      <Header title="Products" subtitle="List of Products" />
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
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={handleSearchChange}
          />
          <Button style={{ color: colors.grey[100] }}>
            <Print />
            {handleDownloadPDF()}
          </Button>
        </Box>
        <DataGrid rows={row} columns={columns} pageSize={10} autoHeight />
      </Box>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteConfirmationClose}
            style={{ color: colors.grey[100] }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(selectedProductId)}
            style={{ color: colors.grey[100] }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllProducts;

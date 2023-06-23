import React, { useEffect, useState } from "react";
import { AddCircleOutline, DeleteOutline, Print } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { categoriesData } from "static/data";
import { toast } from "react-toastify";
import { tokens } from "../../../ColorToken";
import axios from "axios";
import { server } from "server";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";
import styles from "styles/styles";
import Loader from "components/Loader";
const Coupons = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupouns, setCoupons] = useState([]);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [value, setValue] = useState(null);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleDelete = async (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success("Coupon has been deleted successfully!");
      });
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Coupon has been created successfully created");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      minWidth: 150,
      flex: 0.8,
    },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 180,
      flex: 1.5,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      minAmount: 120,
      headerName: "Delete",
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

  coupouns &&
    coupouns.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        sold: 10,
      });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10">
          <div className="w-full flex justify-end">
            <Button
              className={`!w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              style={{ color: colors.grey[100] }}
              onClick={() => setOpen(true)}
            >
              <span>Create Coupon Code</span>
            </Button>
          </div>
          <Box m="1.5rem 2.rem">
            <Header title="Coupons" subtitle="List of Coupons" />
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
                  {/* {handleDownloadPDF()} */}
                </Button>
              </Box>
              <DataGrid rows={row} columns={columns} pageSize={10} autoHeight />
            </Box>
          </Box>
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen  z-[20000] flex items-center justify-center">
              <div
                className="w-[90%] 800px:w-[40%] h-[80vh]  rounded-md shadow p-4"
                style={{ background: colors.primary[400] }}
              >
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5
                  className="text-[30px] text-center"
                  style={{ color: colors.grey[100] }}
                >
                  Create Coupon code
                </h5>
                {/* create coupoun code */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div>
                    <label className="pb-2" style={{ color: colors.grey[100] }}>
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your coupon code name..."
                      style={{
                        backdropFilter: "blur(8px)",
                        color: colors.grey[500], // Atur warna font yang kontras
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2" tyle={{ color: colors.grey[800] }}>
                      Discount Percentenge
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="value"
                      value={value}
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter your coupon code value..."
                      style={{
                        backdropFilter: "blur(8px)",
                        color: colors.grey[500], // Atur warna font yang kontras
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2" tyle={{ color: colors.grey[500] }}>
                      Min Amount
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={minAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder="Enter your coupon code min amount..."
                      style={{
                        backdropFilter: "blur(8px)",
                        color: colors.grey[500], // Atur warna font yang kontras
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2" tyle={{ color: colors.grey[500] }}>
                      Max Amount
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={maxAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Enter your coupon code max amount..."
                      style={{
                        backdropFilter: "blur(8px)",
                        color: colors.grey[500], // Atur warna font yang kontras
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2" tyle={{ color: colors.grey[100] }}>
                      Selected Product
                    </label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                      style={{ color: colors.grey[500] }}
                    >
                      <option
                        value="Choose your selected products"
                        style={{ color: colors.grey[500] }}
                      >
                        Choose a selected product
                      </option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Create"
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      style={{
                        backdropFilter: "blur(8px)",
                        color: colors.grey[100], // Atur warna font yang kontras
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Coupons;

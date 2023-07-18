import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo, useEffect, useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { theme } from "themePetShop";
import {
  LoginPage,
  SignupPage,
  HomePage,
  ActivationPage,
  ProductsPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProductDetailsPage,
  UserOrderDetailsPage,
  TrackOrderDetailsPage,
  UserInbox,
  DoctorSignupPage,
  DoctorActivationPage,
  MyProfilePage,
  AddressPage,
  ChangePasswordPage,
  OrderPage,
  RefundPage,
  TrackingPage,
  FaqPage,
  LoginAdmin,
  Register,
  AdminActivationPage,
  PreviewPage,
  DoctorLoginPage,
  KonsultasiPage,
  ReservationSuccessPage,
  DoctorChatPage,
  AboutPage,
  FaqAllPage,
  PaginatedProducts,
} from "routes/Route";
import {
  Dashboard,
  AllProducts,
  CreateProductPage,
  Refund,
  DashboardEvent,
  CreateEventPage,
  AllOrdersPage,
  OrdersDetailsPage,
  AdminInbox,
  AllCouponsPage,
  AdminSettingPage,
} from "routes/ShopRoutes";
import {
  DocInboxPage,
  DoctorProfile,
  DoctorProfilePage,
} from "routes/DoctorRoutes";
// import Layout from "Pages/Admin/Layout";
// import Dashboard from "Pages/Admin/Dashboard";
// import Product from "Pages/Admin/Product";
// import Customers from "Pages/Admin/Customers";
// import Transactions from "Pages/Admin/Transactions";
import ProtectedRoute from "routes/ProtectedRoute";
import SellerProtectedRoute from "routes/SellerProtectedRoute";
import DoctorProtectedRoute from "routes/DoctorProtectedRoute";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { server } from "./server";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Store from "./redux/store";
import { loadUser, loadSeller } from "./redux/actions/user";
import { loadDoctor, getUserAllDoctors } from "redux/actions/doctor";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "redux/actions/event";
const App = () => {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(loadDoctor());
    Store.dispatch(getUserAllDoctors());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApikey();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        {stripeApikey && (
          <Elements stripe={loadStripe(stripeApikey)}>
            <Routes>
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Elements>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route
            path="activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route
            path="/doctor/activation/:activation_token"
            element={<DoctorActivationPage />}
          />
          <Route
            path="/seller/activation/:activation_token"
            element={<AdminActivationPage />}
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/reservation-success"
            element={<ReservationSuccessPage />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faqAll" element={<FaqAllPage />} />
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route
            path="/MyProfilePage"
            element={
              <ProtectedRoute>
                <MyProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/konsultasi"
            element={
              <ProtectedRoute>
                <KonsultasiPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addressPage"
            element={
              <ProtectedRoute>
                <AddressPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/changePasswordPage"
            element={
              <ProtectedRoute>
                <ChangePasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Orders"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/TrackOrder"
            element={
              <ProtectedRoute>
                <TrackingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/refunds"
            element={
              <ProtectedRoute>
                <RefundPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute>
                <UserOrderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/track/order/:id"
            element={
              <ProtectedRoute>
                <TrackOrderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoute>
                <UserInbox />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctorinbox"
            element={
              <ProtectedRoute>
                <DoctorChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faq"
            element={
              <ProtectedRoute>
                <FaqPage />
              </ProtectedRoute>
            }
          />
          <Route path="/shop/preview/:id" element={<PreviewPage />} />
          {/* Admin Routes */}
          <Route path="/shop-create" element={<Register />} />
          <Route path="/shop-login" element={<LoginAdmin />} />

          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <Dashboard />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute>
                <AllProducts />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <CreateProductPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-refunds"
            element={
              <SellerProtectedRoute>
                <Refund />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRoute>
                <DashboardEvent />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <CreateEventPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-orders"
            element={
              <SellerProtectedRoute>
                <AllOrdersPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <SellerProtectedRoute>
                <OrdersDetailsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-messages"
            element={
              <SellerProtectedRoute>
                <AdminInbox />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-coupons"
            element={
              <SellerProtectedRoute>
                <AllCouponsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <SellerProtectedRoute>
                <AdminSettingPage />
              </SellerProtectedRoute>
            }
          />
          {/* Doctor */}
          <Route path="/login-doctor" element={<DoctorLoginPage />} />
          <Route path="/doctor-register" element={<DoctorSignupPage />} />
          <Route
            path="/doctor-profile"
            element={
              <DoctorProtectedRoute>
                <DoctorProfilePage />
              </DoctorProtectedRoute>
            }
          />
          <Route
            path="/inbox-doctor"
            element={
              <DoctorProtectedRoute>
                <DocInboxPage />
              </DoctorProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </div>
  );
};

export default App;

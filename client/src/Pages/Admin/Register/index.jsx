import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopCreate from "../../../components/Admin/Register";

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const { isSeller, seller } = useSelector((state) => state.seller);

  // useEffect(() => {
  //   if (isSeller === true) {
  //     navigate(`/shop/${seller._id}`);
  //   }
  // }, []);

  if (isSeller === true) {
    return navigate("/");
  }
  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;

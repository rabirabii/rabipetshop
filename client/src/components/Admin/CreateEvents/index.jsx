import React, { useEffect, useState } from "react";
import { AddCircleOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "static/data";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material";
import { createevent } from "redux/actions/event";
import { tokens } from "../../../ColorToken";
import { AiOutlinePlusCircle } from "react-icons/ai";
const CreateEvent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minEndDate, setMinEndDate] = useState("");

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    setStartDate(startDate);
    setEndDate(null);
    setMinEndDate(minEndDate);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  useEffect(() => {
    if (startDate) {
      const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
      setMinEndDate(minEndDate);
    }
  }, [startDate]);

  const today = new Date().toISOString().slice(0, 10);

  //   const minEndDate = startDate
  //     ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
  //         .toISOString()
  //         .slice(0, 10)
  //     : "";

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfully!");
      navigate("/dashboard-events");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    newForm.append("start_Date", startDate.toISOString());
    newForm.append("Finish_Date", endDate.toISOString());
    dispatch(createevent(newForm));
  };
  return (
    <div
      className="w-[90%] 800px:w-[50%] shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll"
      style={{ background: `${colors.primary[400]} !important` }}
    >
      <h5
        className="text-[30px] font-Poppins text-center"
        style={{ color: colors.grey[100] }}
      >
        Create Event
      </h5>
      {/* create event form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2" style={{ color: colors.grey[100] }}>
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your event product name..."
            style={{
              backdropFilter: "blur(8px)",
              color: colors.grey[500], // Atur warna font yang kontras
            }}
          />
        </div>
        <br />
        <div>
          <label className="pb-2" style={{ color: colors.grey[100] }}>
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your event product description..."
            style={{
              backdropFilter: "blur(8px)",
              color: colors.grey[500], // Atur warna font yang kontras
            }}
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2" style={{ color: colors.grey[100] }}>
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              backdropFilter: "blur(8px)",
              color: colors.grey[500], // Atur warna font yang kontras
            }}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2" style={{ color: colors.grey[100] }}>
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your event product tags..."
            style={{
              backdropFilter: "blur(8px)",
              color: colors.grey[500], // Atur warna font yang kontras
            }}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your event product price..."
            style={{
              backdropFilter: "blur(8px)",
              color: colors.grey[500], // Atur warna font yang kontras
            }}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your event product price with discount..."
            style={{
              backdropFilter: "blur(8px)",
              color: colors.grey[500], // Atur warna font yang kontras
            }}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your event product stock..."
            style={{
              backdropFilter: "blur(8px)",
              color: colors.grey[500], // Atur warna font yang kontras
            }}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="price"
            id="start-date"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleStartDateChange}
            min={today}
            placeholder=""
            style={{
              backdropFilter: "blur(8px)",
              color: colors.grey[500], // Atur warna font yang kontras
            }}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="price"
            id="start-date"
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleEndDateChange}
            min={minEndDate}
            placeholder=""
            style={{
              backdropFilter: "blur(8px)",
              color: colors.grey[500], // Atur warna font yang kontras
            }}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;

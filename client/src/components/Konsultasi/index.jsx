import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Pagination,
  Avatar,
  Grid,
  CardActions,
  Button,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getUserAllDoctors } from "redux/actions/doctor";
import Header from "components/Kepala";
import { backend_url, server } from "../../server";
import { useNavigate } from "react-router-dom";
import ReservationForm from "./reservationForm";
import axios from "axios";

const Konsultasi = () => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { doctors } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const currentTime = new Date();
  const currentUTCHours = currentTime.getUTCHours();
  const currentGMTPlus7 = (currentUTCHours + 7) % 24;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    dispatch(getUserAllDoctors(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    dispatch(getUserAllDoctors(page));
  };

  // Decide whether the button should be displayed or not
  const isWithWorkingHours = currentGMTPlus7 >= 9 && currentGMTPlus7 < 15;
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const handleReserve = (doctorId) => {
    setReservationData({
      doctorId: doctorId,
      name: "",
      time: "",
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const [reservationData, setReservationData] = useState({
    doctorId: "",
    name: "",
    time: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      if (doctors.length > 0) {
        const groupTitle = doctors[0]._id + user._id;
        const userId = user._id;
        const doctorId = doctors[0]._id;

        await axios
          .post(`${server}/conversation/create-new-doctor-conversation`, {
            groupTitle,
            userId,
            doctorId,
          })
          .then((res) => {
            navigate(`/doctorinbox?${res.data.conversation._id}`);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      } else {
        toast.error("No doctors available for conversation.");
      }
    } else {
      toast.error("Please login to create a new conversation");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop="80px"
    >
      <Header title="List of Doctors" />
      <Box width="80%">
        <Grid container spacing={5}>
          {doctors.length === 0 ? (
            <Typography
              variant="h5"
              align="center"
              style={{ padding: "30px 0" }}
            >
              No doctors found.
            </Typography>
          ) : (
            doctors.map((doctor, index) => (
              <Grid item key={doctor._id} xs={12} sm={10} md={6} lg={2.73}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    width="100"
                    height={120}
                    image={`${backend_url}${doctor?.avatar}`}
                    alt={doctor.name}
                    sx={{
                      objectFit: "contain",
                      minHeight: "350px",
                    }}
                  />
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar
                        src={`${backend_url}${doctor?.avatar}`}
                        alt={doctor.name}
                        sx={{ width: 80, height: 80 }}
                      />
                      <Box ml={2}>
                        <Typography
                          variant="h6"
                          component="h2"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          Drh.{doctor.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {doctor.speciality}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle2">
                          Experience: {doctor.experience}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle2">
                          Graduated From: {doctor.graduatedFrom}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle2">
                          License Number: {doctor.licenseNumber}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" component="p">
                      {doctor.description}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      justifyContent: "flex-end",
                      borderTop: "1px solid #f0f0f0",
                    }}
                  >
                    {isWithWorkingHours && (
                      <>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleReserve(doctor._id)}
                        >
                          Reserve
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={handleMessageSubmit}
                        >
                          Chat
                        </Button>
                      </>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
      <Box mt={4} display="flex" justifyContent="center">
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        )}
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Make a Reservation</DialogTitle>
        <DialogContent>
          <ReservationForm handleReserve={handleReserve} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button color="primary">Reserve</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Konsultasi;

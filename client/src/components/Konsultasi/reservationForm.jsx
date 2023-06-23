import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
const ReservationForm = ({ doctorId, onSubmit }) => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Panggil fungsi onSubmit dan kirimkan data reservasi
    onSubmit({ doctorId, name, time });

    // Reset nilai form setelah mengirim data
    setName("");
    setTime("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        name="time"
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Reserve
      </Button>
    </form>
  );
};

export default ReservationForm;

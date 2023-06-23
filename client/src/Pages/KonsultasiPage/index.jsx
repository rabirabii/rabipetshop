import React, { useState } from "react";
import Cobaa from "../../components/cobaa";
import Bar from "../../components/Bar";
import Loader from "../../components/Loader";
import Konsultasi from "components/Konsultasi";

import ReservationForm from "components/Konsultasi/reservationForm";

const KonsultasiPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { data, setData } = useState(null);
  const handleReservation = (doctorId) => {
    if (doctorId) {
      const doctor = doctor.find((doctor) => doctor._id === doctorId);
      setSelectedDoctor(doctor);
    } else {
      setSelectedDoctor(null);
    }
  };
  return (
    <div>
      <Cobaa />
      <Konsultasi data={data} />
      {selectedDoctor && (
        <ReservationForm
          selectedDoctor={selectedDoctor}
          handleReservation={handleReservation}
        />
      )}
      <Bar />
    </div>
  );
};

export default KonsultasiPage;

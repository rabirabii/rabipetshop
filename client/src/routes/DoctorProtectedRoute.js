import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "components/Loader";

const DoctorProtectedRoute = ({ children }) => {
  const { isLoading, isDoctor } = useSelector((state) => state.doctor);
  if (isLoading === true) {
    return <Loader />;
  } else {
    if (!isDoctor) {
      return <Navigate to={`/login-doctor`} replace />;
    }
    return children;
  }
};

export default DoctorProtectedRoute;

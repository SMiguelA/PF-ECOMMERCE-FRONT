import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RutaAdmin = () => {
  const { user } = useSelector((state) => state);

  if (user && !user.isAdmin) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

export default RutaAdmin;

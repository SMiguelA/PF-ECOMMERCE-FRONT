import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const RutaUser = () => {
  const { user } = useSelector((state) => state);

  if (!user) {
    return <Navigate to={"/"} replace/>
  }
  return <Outlet />;
}

export default RutaUser
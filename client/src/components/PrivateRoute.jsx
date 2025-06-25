import { Navigate, Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";


const PrivateRoute = () => {
  const { loading, isLoggedIn } = useSelector((state) => state.auth);


  const token = sessionStorage.getItem("token");
 
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is logged in
  if (token || isLoggedIn) {
    return <Outlet />;
  }
  // If user is not logged in, navigate to login
  else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;

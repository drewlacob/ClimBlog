import { Outlet, Navigate } from "react-router-dom";

//https://www.youtube.com/watch?v=27KeYk-5vJw&ab_channel=DaveGray
const PrivateRoutes = () => {
  //change this to get jwt token
  let auth = { token: true };
  return auth.token ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;

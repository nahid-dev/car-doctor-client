import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Orders from "../Pages/Orders/Orders";
import PrivetRoutes from "./PrivetRoutes";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "checkout/:id",
        element: (
          <PrivetRoutes>
            <CheckOut></CheckOut>
          </PrivetRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://car-doctor-server-five-rose.vercel.app/services/${params.id}`
          ),
      },
      {
        path: "orders",
        element: (
          <PrivetRoutes>
            <Orders></Orders>
          </PrivetRoutes>
        ),
      },
    ],
  },
]);
// {
//   loc.pathname == "/login" || loc.pathname == "/register" ? (
//     ""
//   ) : (
//     <Footer></Footer>
//   );
// }

export default router;

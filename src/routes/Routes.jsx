import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddJob from "../pages/AddJob";
import AllJob from "../pages/AllJob";
import JobDetails from "../pages/JobDetails";
import PrivateRoute from "./PrivateRoute";
import MyJobs from "../pages/MyJobs";
import UpdateJob from "../pages/UpdateJob";
import AppliedJobs from "../pages/AppliedJobs";
import Blogs from "../pages/Blogs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/add-job',
        element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
      },
      {
        path: '/all-job',
        element: <AllJob></AllJob>
      },
      {
        path: '/job/:id',
        element: <PrivateRoute><JobDetails></JobDetails></PrivateRoute>
      },
      {
        path: '/my-jobs',
        element: <PrivateRoute><MyJobs></MyJobs> </PrivateRoute>
      },
      {
        path: '/applied-jobs',
        element: <PrivateRoute> <AppliedJobs></AppliedJobs> </PrivateRoute>
      },
      {
        path: '/update-job/:id',
        element: <PrivateRoute><UpdateJob></UpdateJob></PrivateRoute>
      },
      {
        path: '/blogs',
        element: <Blogs></Blogs>
      }
    ],
  },
]);
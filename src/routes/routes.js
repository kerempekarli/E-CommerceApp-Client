import Home from "../pages/home/home";
import Detail from "../pages/detail";
import Map from "../pages/map";
import Login from "../pages/login/login";
import AuthenticatedLayout from "../layouts/authenticatedLayout";
export const routes = [
  {
    path: "/",
    element: <AuthenticatedLayout />,
    children: [
      { index: true, element: <Home></Home> },
      { path: "detail", element: <Detail /> },
      { path: "map", element: <Map /> },
      { path: "login", element: <Login /> },
    ],
  },
];

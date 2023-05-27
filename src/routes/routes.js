import Home from "../pages/home/home";
import Detail from "../pages/detail";
import Map from "../pages/map";
import Login from "../pages/login/login";
import SellerLogin from "../pages/login/sellerLogin";
import Categories from "../pages/categories/categories";
import AuthenticatedLayout from "../layouts/authenticatedLayout";
import AddProductPage from "../pages/products/addProduct"
export const routes = [
  {
    path: "/",
    element: <AuthenticatedLayout />,
    children: [
      { index: true, element: <Home></Home> },
      { path: "detail", element: <Detail /> },
      { path: "categories", element: <Categories /> },
      { path: "map", element: <Map /> },
      { path: "products/add", element: <AddProductPage /> },
      { path: "login", element: <Login /> },
      { path: "seller-login", element: <SellerLogin /> },
    ],
  },
];

import Home from "../pages/home/home";
import Detail from "../pages/detail";
import Map from "../pages/map";
import Login from "../pages/login/login";
import SellerLogin from "../pages/login/sellerLogin";
import UserRegister from "../pages/UserRegister/UserRegister";
import SellerRegister from "../pages/SellerRegister/SellerRegister";
import Categories from "../pages/categories/categories";
import AuthenticatedLayout from "../layouts/authenticatedLayout";
import AddProductPage from "../pages/products/addProduct";
import AddCategory from "../pages/categories/AddCategory";
import ProductDetail from "../pages/productDetail/ProductDetail";
import ContactPage from "../pages/contact/contact";
import AboutPage from "../pages/about/about.js";
import SalesChart from "../pages/d3/d3";
import CartDetail from "../pages/cart/CartPage";
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
      { path: "register", element: <UserRegister /> },
      { path: "seller-register", element: <SellerRegister /> },
      { path: "add-category", element: <AddCategory /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/sales-chart", element: <SalesChart /> },
      { path: "/cart-detail", element: <CartDetail /> },
    ],
  },
];

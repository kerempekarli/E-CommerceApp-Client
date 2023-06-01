import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Wishlist from "../wishlist/wishlist";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { clearCartAction } from "../../stores/cart/cartActions";
import { useDispatch } from "react-redux";
import { learnUserRole } from "../../utils/checkRole";
import {
  faThumbsUp,
  faShoppingCart,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const [role, setRole] = useState("");
  useEffect(() => {
    learnUserRole(setRole);
    console.log("ÇALIŞTIM");
  }, [location, role]);

  const handleLogout = () => {
    // Çerezden tokeni temizle
    Cookies.remove("token");
    setRole("");
    // Giriş sayfasına yönlendir
    navigate("/");

    dispatch(clearCartAction());
  };
  return (
    <nav className="flex relative items-center justify-around max-w-7xl mx-auto font-medium text-xl h-20">
      <div className="text-2xl font-semibold">Logo</div>
      <div className="space-x-10">
        <Link to={"/"}>Home</Link>
        <Link to={"/categories"}>Categories</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
      </div>
      <div className="text-2xl flex font-medium">
        {role === "user" && (
          <button
            className="mr-2"
            onClick={() => {
              setOpen(!isOpen);
            }}
          >
            <FontAwesomeIcon
              icon={faShoppingCart}
              className={`text-2xl text-yellow-500`}
            />
          </button>
        )}
        {role === "user" && <Wishlist></Wishlist>}
        <button
          className="text-2xl bg-red-500 p-2 ml-10 text-white rounded-lg"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button>
      </div>
      {isOpen && <Cart></Cart>}
    </nav>
  );
}

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { clearCartAction } from "../../stores/cart/cartActions";
import { useDispatch } from "react-redux";
import { learnUserRole } from "../../utils/checkRole";
export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  useEffect(() => {
    learnUserRole(setRole);
  }, []);

  const handleLogout = () => {
    // Çerezden tokeni temizle
    Cookies.remove("token");

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
      <div className="text-2xl font-medium">
        {role === "user" && (
          <button
            onClick={() => {
              setOpen(!isOpen);
            }}
          >
            Sepet
          </button>
        )}
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

import React, { useEffect } from "react";
import Rem from "../../assets/Rem.jpg";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikedProducts } from "../../stores/likes/likeAction";
import { loginAction } from "../../stores/auth/authAction";
import Cookies from "js-cookie";

export default function Login() {
  const [auth, setAuth] = useState({ email: null, password: null });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLoginSuccess = (sessionToken, userId) => {
    Cookies.set("token", sessionToken, { expires: 7, path: "/" });
    dispatch(fetchLikedProducts());

    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, " ", value);
    setAuth((prevAuth) => ({ ...prevAuth, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3232/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auth),
      });

      const data = await response.json();
      console.log("RESPONSE ", data);
      dispatch(loginAction(data));

      if (response.status === 200) {
        toast.success("Giriş başarılı!");
        handleLoginSuccess(data.tokens.access_token.toString(), data.id);
      } else {
        toast.error("Giriş başarısız.");
        const token = Cookies.get("token");
        console.log(token);
      }
    } catch (error) {
      console.error("Login request error:", error);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto justify-center flex max-w-5xl rounded-xl  bg-white flex-wrap">
          <img
            className="object-contain w-2/4 rounded-l-xl"
            alt="Rem"
            src={Rem}
          ></img>
          <div className="p-10 flex flex-col items-center text-black  w-2/4 text-2xl">
            <div className="text-center mb-5">
              <h1 className="text-4xl mt-20 mb-4 font-medium">Hello Again!</h1>
              <p className="text-slate-500 text-xl font-semibold">
                Giriş yapmak için Email adresinizi ve şifrenizi girin
              </p>
            </div>
            <div className="">
              <div className="mb-5">
                <div className="">
                  <input
                    name="email"
                    value={auth.email}
                    onChange={handleInputChange}
                    className="text-2xl w-full p-2 hover:border-b-2 border-blue-400 bg-transparent border-b-2 bg-gray-100  outline-none"
                    placeholder="Email"
                  ></input>
                </div>
              </div>
              <div>
                <div>
                  <input
                    name="password"
                    value={auth.password}
                    onChange={handleInputChange}
                    className="text-2xl w-full p-2 hover:border-b-2 bg-transparent border-b-2 border-b-blue-400 border-blue-400 bg-gray-100 outline-none"
                    placeholder="Password"
                  ></input>
                  <button
                    onClick={handleLogin}
                    className="w-full mt-10 block py-3 text-white bg-blue-400"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

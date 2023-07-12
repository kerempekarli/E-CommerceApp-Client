import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Wishlist from "../wishlist/wishlist";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { clearCartAction } from "../../stores/cart/cartActions";
import { useDispatch, useSelector } from "react-redux";

import { learnUserRole } from "../../utils/checkRole";
import { logoutAction } from "../../stores/auth/authAction";
import axios from "axios";
import io from "socket.io-client";
import {
  faThumbsUp,
  faShoppingCart,
  faHeart,
  faBell,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import {
  fetchNotificationData,
  setAllOfSeenTrue,
} from "../../stores/notification/notification";
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const [isOpen, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [isOpenBell, setIsOpenBell] = useState(false);
  const [sellerOrders, setSellerOrders] = useState(false);
  const [notification, setNotification] = useState("");
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.auth);
  const notificationDataRedux = useSelector(
    (state) => state.notifications.notificationData
  );

  const token = Cookies.get("token");
  useEffect(() => {
    const userRole = learnUserRole(setRole);
    console.log("ÇALIŞTIM");
    console.log("ROLE ", userRole);
  }, [location, role]);

  const handleLogout = () => {
    // Çerezden tokeni temizle
    Cookies.remove("token");
    dispatch(logoutAction());
    setRole("");
    // Giriş sayfasına yönlendir
    navigate("/");

    dispatch(clearCartAction());
  };

  useEffect(() => {
    if (auth.user === null) {
      return; // Kullanıcı null ise, işlemleri yapmadan useEffect'i sonlandır
    }

    if (auth.user.role_name === "user") {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3232/notifications/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const notificationData = response.data;
          console.log("NOTIFICATION DATA", notificationData);
          dispatch(fetchNotificationData(notificationData));
        } catch (error) {
          console.log("Veri alınırken bir hata oluştu:", error);
        }
      };

      fetchData();
    } else {
      const fetchDataSeller = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3232/notifications/seller",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const notificationData = response.data;
          console.log("NOTIFICATION DATA of seller", notificationData);
          dispatch(fetchNotificationData(notificationData));
        } catch (error) {
          console.log("Veri alınırken bir hata oluştu:", error);
        }
      };

      fetchDataSeller();
    }
  }, [dispatch, auth, token]);

  useEffect(() => {
    if (auth.user === null) {
      return; // Kullanıcı null ise, işlemleri yapmadan useEffect'i sonlandır
    }

    const socket = io("http://localhost:3002");
    const roomId = user && auth.user.id; // User_id'yi string olarak alın

    // Odaya katıl
    socket.emit("joinRoom", roomId);
    socket.on("notification", async (data) => {
      console.log("BİLDİRİM SOCKET ALINDI!!!!!!", user);
      try {
        const response = await axios.get(
          "http://localhost:3232/notifications/user",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Bearer token'ınızı buraya ekleyin
            },
          }
        );
        const notificationData = response.data;
        dispatch(fetchNotificationData(notificationData));
      } catch (error) {
        console.log("Veri alınırken bir hata oluştu:", error);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, token, user]);

  const fetchOrders = async () => {
    try {
      // API çağrısını Axios ile yapın
      const response = await axios.get(
        "http://localhost:3232/orders/getOrders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setOrders(data);
      console.log("FETCH ORDER DOĞRU ", data);
    } catch (error) {
      console.error("Siparişleri alırken bir hata oluştu:", error);
    }
  };
  const handleCloseNotification = async () => {
    if (isOpenBell === true) {
      setIsOpenBell(!isOpenBell);
      const response = await axios.post(
        "http://localhost:3232/notifications/set-all-notifications-true",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer token'ınızı buraya ekleyin
          },
        }
      );
      dispatch(setAllOfSeenTrue());
    } else {
      setIsOpenBell(!isOpenBell);
    }
  };
  const handleSelleOrders = async () => {
    fetchOrders();
    setSellerOrders(!sellerOrders);
  };
  const changeOrderStatus = async (logic, id) => {
    try {
      if (logic === true) {
        console.log("LOGIC TRUE CALISTI");
        const response = await axios.put(
          "http://localhost:3232/orders/order-details/:id",
          {
            orderId: id,
            newStatus: "preparing",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Durum başarıyla güncellendi
          console.log("Sipariş ayrıntısı kabul edildi.");
          // Ek işlemler yapabilirsiniz
          const updatedOrders = orders.map((order) => {
            if (order.order_detail_id === id) {
              return {
                ...order,
                status: "preparing",
              };
            }
            return order;
          });

          // Güncellenmiş sellerOrders dizisini ayarla
          setOrders(updatedOrders);
        } else {
          // Durum güncelleme başarısız oldu
          console.error(
            "Sipariş ayrıntısı durumu güncellenirken bir hata oluştu."
          );
          // Hata durumunu ele alabilirsiniz
        }
      }

      if (logic === false) {
        console.log("FALSE");
        const response = await axios.put(
          "http://localhost:3232/orders/order-details/:id",
          {
            orderId: id,
            newStatus: "denied",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Durum başarıyla güncellendi
          console.log("Sipariş ayrıntısı reddedildi.");
          // Ek işlemler yapabilirsiniz
          const updatedOrders = orders.map((order) => {
            if (order.order_detail_id === id) {
              return {
                ...order,
                status: "denied",
              };
            }
            return order;
          });

          // Güncellenmiş sellerOrders dizisini ayarla
          setOrders(updatedOrders);
        } else {
          // Durum güncelleme başarısız oldu
          console.error(
            "Sipariş ayrıntısı durumu güncellenirken bir hata oluştu."
          );
          // Hata durumunu ele alabilirsiniz
        }
      }
    } catch (error) {
      console.error("İstek gönderilirken bir hata oluştu:", error);
    }
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
        {auth.user.role_name === "seller" && (
          <div onClick={handleSelleOrders} className="mt-2 text-amber-500">
            {" "}
            <button>
              <FontAwesomeIcon icon={faBoxOpen} className={`text-2xl `} />
            </button>
          </div>
        )}
        {auth.user === "user" && <Wishlist></Wishlist>}
        {auth.user !== null && (
          <button className="ml-2" onClick={handleCloseNotification}>
            <FontAwesomeIcon
              icon={faBell}
              className={`text-2xl text-amber-600`}
            />
          </button>
        )}
        {auth.user !== null && (
          <button
            className="text-2xl bg-red-500 p-2 ml-10 text-white rounded-lg"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        )}

        {isOpen && <Cart setOpen={setOpen}></Cart>}
        {sellerOrders && (
          <div className="absolute top-20">
            <ul>
              {orders.map((order) =>
                order.status === "pending" ? (
                  <li
                    key={order.order_detail_id}
                    className="mb-2 text-left bg-orange-300 text-black border border-black text-sm p-2"
                  >
                    <div>Ürün adı: {order.product_name}</div>
                    <div>Adet: {order.quantity}</div>
                    <div>Alıcı: {order.username}</div>
                    <div>
                      Sipariş tutarı: {order.unit_price * order.quantity} TL
                    </div>
                    <div>{order.status}</div>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={(e) =>
                          changeOrderStatus(false, order.order_detail_id)
                        }
                        className="px-3 py-2 text-white rounded-md bg-red-500"
                      >
                        Reddet
                      </button>
                      <button
                        onClick={(e) =>
                          changeOrderStatus(true, order.order_detail_id)
                        }
                        className="px-3 py-2  text-white rounded-md bg-green-600"
                      >
                        Kabul et
                      </button>
                    </div>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        )}
        {auth.user !== null && isOpenBell && (
          <div className="absolute z-10 bg-green-100 p-5 top-20">
            {notificationDataRedux?.map((notification) => (
              <div
                key={notification.id}
                className={`${
                  notification.seen ? "bg-green-500" : "bg-gray-300"
                } p-2 mb-2`}
              >
                {notification.content}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

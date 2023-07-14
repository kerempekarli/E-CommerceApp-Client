import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import styles from "./OrderPage.module.css";
const token = Cookies.get("token");

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [shippingOrders, setShippingOrders] = useState([]);
  const [preparingOrders, setPreparingOrders] = useState([]);
  useEffect(() => {
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

        const pending = data.filter((order) => order.status === "pending");
        setPendingOrders(pending);

        const completed = data.filter((order) => order.status === "completed");
        setCompletedOrders(completed);

        const shipping = data.filter((order) => order.status === "shipping");
        setShippingOrders(shipping);

        const preparing = data.filter((order) => order.status === "preparing");
        setPreparingOrders(preparing);
      } catch (error) {
        console.error("Siparişleri alırken bir hata oluştu:", error);
      }
    };
    fetchOrders();
  }, [token]);

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
    <div>
      <div className="flex"></div>
      <div className="mx-20 my-10 p-2">
        <h2 className="font-semibold text-2xl">Pending Orders</h2>
        <ul
          className={`flex overflow-auto ${styles.scrollableList} ${styles.customScrollbar}`}
        >
          {pendingOrders.map((order) => (
            <li
              className="bg-blue-100 p-3 m-3 rounded-md text-left font-semibold"
              key={order.id}
            >
              <div>Ürün adı: {order.product_name}</div>
              <div>Adet: {order.quantity}</div>
              <div>Alıcı: {order.username}</div>
              <div>Sipariş tutarı: {order.unit_price * order.quantity} TL</div>
              <div>{order.status}</div>
              <div className="mt-2">
                <button
                  className="p-2 mr-2 rounded-md text-white bg-green-500"
                  onClick={() => changeOrderStatus(order.id)}
                >
                  Kabul Et
                </button>
                <button
                  className="p-2  rounded-md text-white bg-red-500"
                  onClick={() => changeOrderStatus(order.id)}
                >
                  Reddet
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-20 my-10  p-2">
        <h2 className="font-semibold text-2xl">Preparing Orders</h2>
        <ul
          className={`flex overflow-auto ${styles.scrollableList} ${styles.customScrollbar}`}
        >
          {preparingOrders.map((order) => (
            <li
              className="bg-blue-100 p-3 m-3 rounded-md text-left font-semibold"
              key={order.id}
            >
              <div>Ürün adı: {order.product_name}</div>
              <div>Adet: {order.quantity}</div>
              <div>Alıcı: {order.username}</div>
              <div>Sipariş tutarı: {order.unit_price * order.quantity} TL</div>
              <div>{order.status}</div>
              <div className="mt-2">
                <input
                  className="p-1 outline-none"
                  type="text"
                  placeholder="Kargo Kodu"
                  value={order.tracking_number}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-20 my-10 p2">
        <h2 className="font-semibold text-2xl">Completed Orders</h2>
        <ul
          className={`flex overflow-auto ${styles.scrollableList} ${styles.customScrollbar}`}
        >
          {completedOrders.map((order) => (
            <li
              className="bg-blue-100 p-3 m-3 rounded-md text-left font-semibold"
              key={order.id}
            >
              <div>Ürün adı: {order.product_name}</div>
              <div>Adet: {order.quantity}</div>
              <div>Alıcı: {order.username}</div>
              <div>Sipariş tutarı: {order.unit_price * order.quantity} TL</div>
              <div>{order.status}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-20 my-10 p-2">
        <h2 className="font-semibold text-2xl">Shipping Orders</h2>
        <ul
          className={`flex overflow-auto ${styles.scrollableList} ${styles.customScrollbar}`}
        >
          {shippingOrders.map((order) => (
            <li
              className="bg-blue-100 p-3 m-3 rounded-md text-left font-semibold"
              key={order.id}
            >
              <div>Ürün adı: {order.product_name}</div>
              <div>Adet: {order.quantity}</div>
              <div>Alıcı: {order.username}</div>
              <div>Sipariş tutarı: {order.unit_price * order.quantity} TL</div>
              <div>{order.status}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

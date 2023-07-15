import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import styles from "./UserOrderPage.module.css";
const token = Cookies.get("token");
export default function UserOrder() {
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
  return (
    <div>
      {" "}
      return (
      <div className="text-left">
        <div className="flex justify-center bg-blue-500 mt-10 py-10">
          <div className="bg-blue-500 text-white font-medium text-left text-2xl px-10  mx-4">
            <div>Pending orders</div>
            <div>{pendingOrders.length}</div>
          </div>
          <div className="bg-blue-500 text-white font-medium text-left text-2xl px-10  mx-4">
            <div className="">Preparing orders</div>
            <div>{preparingOrders.length}</div>
          </div>
          <div className="bg-blue-500 text-white font-medium text-left text-2xl px-10  mx-4">
            <div>Shipping orders</div>
            <div>{shippingOrders.length}</div>
          </div>
          <div className="bg-blue-500 text-white font-medium text-left text-2xl px-10  mx-4">
            <div>Completed orders</div>
            <div>{completedOrders.length}</div>
          </div>
        </div>
        {pendingOrders.length > 0 && (
          <div className="mx-20 my-10 p-2">
            <h2 className="font-semibold text-2xl text-orange-500 mb-2">
              Pending Orders
            </h2>
            <ul
              className={`flex overflow-auto ${styles.scrollableList} ${styles.customScrollbar}`}
            >
              {pendingOrders?.map((order) => (
                <li
                  className="bg-blue-100 p-3 m-3 rounded-md text-left font-semibold"
                  key={order.order_detail_id}
                >
                  <div>Ürün adı: {order.product_name}</div>
                  <div>Adet: {order.quantity}</div>
                  <div>Alıcı: {order.username}</div>
                  <div>
                    Sipariş tutarı: {order.unit_price * order.quantity} TL
                  </div>
                  <div>{order.status}</div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mx-20 my-10  p-2">
          <h2 className="font-semibold text-2xl text-orange-500 mb-2">
            Preparing Orders
          </h2>
          <ul
            className={`flex overflow-auto ${styles.scrollableList} ${styles.customScrollbar}`}
          >
            {preparingOrders.length > 0 &&
              preparingOrders.map((order) => (
                <li
                  className="bg-blue-100 p-3 m-3 rounded-md text-left font-semibold"
                  key={order.id}
                >
                  <div>Ürün adı: {order.product_name}</div>
                  <div>Adet: {order.quantity}</div>
                  <div>Alıcı: {order.username}</div>
                  <div>
                    Sipariş tutarı: {order.unit_price * order.quantity} TL
                  </div>
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
          <h2 className="font-semibold text-2xl text-orange-500 mb-2">
            Completed Orders
          </h2>
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
                <div>
                  Sipariş tutarı: {order.unit_price * order.quantity} TL
                </div>
                <div>{order.status}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-20 my-10 p-2">
          <h2 className="font-semibold text-2xl text-orange-500 mb-2">
            Shipping Orders
          </h2>
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
                <div>
                  Sipariş tutarı: {order.unit_price * order.quantity} TL
                </div>
                <div>{order.status}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      );
    </div>
  );
}

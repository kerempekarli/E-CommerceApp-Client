import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./UserOrderPage.module.css";

const token = Cookies.get("token");

export default function UserOrder() {
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [shippingOrders, setShippingOrders] = useState([]);
  const [preparingOrders, setPreparingOrders] = useState([]);
  const [deniedOrders, setDeniedOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
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

        const pending = data.filter((order) =>
          order.order_details.some((detail) => detail.status === "pending")
        );
        setPendingOrders(pending);

        const completed = data.filter((order) =>
          order.order_details.some((detail) => detail.status === "completed")
        );
        setCompletedOrders(completed);

        const shipping = data.filter((order) =>
          order.order_details.some((detail) => detail.status === "shipping")
        );
        setShippingOrders(shipping);

        const preparing = data.filter((order) =>
          order.order_details.some((detail) => detail.status === "preparing")
        );
        setPreparingOrders(preparing);
        const denied = data.filter((order) =>
          order.order_details.some((detail) => detail.status === "preparing")
        );
        setDeniedOrders(preparing);
      } catch (error) {
        console.error("Siparişleri alırken bir hata oluştu:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <div className="text-left">
        <div className="flex justify-center bg-blue-500 mt-10 py-10">
          <div className="bg-blue-500 text-white font-medium text-left text-2xl px-10 mx-4">
            <div>Pending orders</div>
            <div>{pendingOrders.length}</div>
          </div>
          <div className="bg-blue-500 text-white font-medium text-left text-2xl px-10 mx-4">
            <div className="">Preparing orders</div>
            <div>{preparingOrders.length}</div>
          </div>
          <div className="bg-blue-500 text-white font-medium text-left text-2xl px-10 mx-4">
            <div>Shipping orders</div>
            <div>{shippingOrders.length}</div>
          </div>
          <div className="bg-blue-500 text-white font-medium text-left text-2xl px-10 mx-4">
            <div>Completed orders</div>
            <div>{completedOrders.length}</div>
          </div>
        </div>
        {pendingOrders.length > 0 && (
          <div className="mx-20 my-10 p-2">
            <h2 className="font-semibold text-2xl text-orange-500 mb-2">
              Pending Orders
            </h2>
            <div
              className={`flex overflow-auto ${styles.scrollableList} ${styles.customScrollbar}`}
            >
              <ul className="flex">
                {pendingOrders.map((order) => (
                  <li
                    className="bg-blue-100 w-48 p-3 m-3 rounded-md text-left font-semibold"
                    key={order.order_id}
                  >
                    {order.order_details.map((detail) => (
                      <div key={detail.id}>
                        <div>Ürün adı: {detail.product_name}</div>
                        <div>Adet: {detail.quantity}</div>
                        <div>Alıcı: {detail.username}</div>
                        <div>
                          Sipariş tutarı: {detail.unit_price * detail.quantity}{" "}
                          TL
                        </div>
                        <div>{detail.status}</div>
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {preparingOrders.length > 0 && (
          <div className="mx-20 my-10 p-2">
            <h2 className="font-semibold text-2xl text-orange-500 mb-2">
              Preparing Orders
            </h2>
            <div
              className={`flex overflow-auto ${styles.scrollableList} ${styles.customScrollbar}`}
            >
              <ul className="flex">
                {preparingOrders.map((order) => (
                  <li
                    className="bg-blue-100 p-3 m-3 w-48 rounded-md text-left font-semibold"
                    key={order.order_id}
                  >
                    {order.order_details.map((detail) => (
                      <div key={detail.id}>
                        <div>Ürün adı: {detail.product_name}</div>
                        <div>Adet: {detail.quantity}</div>
                        <div>Alıcı: {detail.username}</div>
                        <div>
                          Sipariş tutarı: {detail.unit_price * detail.quantity}{" "}
                          TL
                        </div>
                        <div>Sipariş tutarı: {detail.status}</div>
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}{" "}
        {shippingOrders.length > 0 && (
          <div className="mx-20 my-10 p-2">
            <h2 className="font-semibold text-2xl text-orange-500 mb-2">
              Shipping Orders
            </h2>
            <div
              className={`flex overflow-auto ${styles.scrollableList} ${styles.customScrollbar}`}
            >
              <ul className="flex">
                {shippingOrders.map((order) => (
                  <li
                    className="bg-blue-100 w-48 p-3 m-3 rounded-md text-left font-semibold"
                    key={order.order_id}
                  >
                    {order.order_details.map((detail) => (
                      <div key={detail.id}>
                        <div>Ürün adı: {detail.product_name}</div>
                        <div>Adet: {detail.quantity}</div>
                        <div>Alıcı: {detail.username}</div>
                        <div>
                          Sipariş tutarı: {detail.unit_price * detail.quantity}{" "}
                          TL
                        </div>
                        <div>{detail.status}</div>
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {completedOrders.length > 0 && (
          <div className="mx-20 my-10 p-2">
            <h2 className="font-semibold text-2xl text-orange-500 mb-2">
              Completed Orders
            </h2>
            <div
              className={`flex overflow-auto ${styles.scrollableList} ${styles.customScrollbar}`}
            >
              <ul className="flex">
                {completedOrders.map((order) => (
                  <li
                    className="bg-blue-100 p-3 m-3 rounded-md text-left font-semibold"
                    key={order.order_id}
                  >
                    {order.order_details.map((detail) => (
                      <div key={detail.id}>
                        <div>Ürün adı: {detail.product_name}</div>
                        <div>Adet: {detail.quantity}</div>
                        <div>Alıcı: {detail.username}</div>
                        <div>
                          Sipariş tutarı: {detail.unit_price * detail.quantity}{" "}
                          TL
                        </div>
                        <div>{detail.status}</div>
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

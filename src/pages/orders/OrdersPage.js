import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

const token = Cookies.get("token");

export default function OrdersPage() {
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
        console.log("FETCH ORDER DOĞRU ", data);
      } catch (error) {
        console.error("Siparişleri alırken bir hata oluştu:", error);
      }
    };
    fetchOrders();
  }, [token]);
  const [orders, setOrders] = useState([]);
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
      {/* CONTAİNER */}
      <div className="flex justify-center space-x-10">
        <div className="w-64 border h-32 font-medium text-left">
          <div className="text-5xl mt-5 ml-5">45</div>
          <div className="ml-5">Pending orders</div>
        </div>
        <div className="w-64 border h-32 font-medium text-left">
          <div className="text-5xl mt-5 ml-5">45</div>
          <div className="ml-5">Preparing orders</div>
        </div>
        <div className="w-64 border h-32 font-medium text-left">
          <div className="text-5xl mt-5 ml-5">45</div>
          <div className="ml-5">Shipping orders</div>
        </div>
        <div className="w-64 border h-32 font-medium text-left">
          <div className="text-5xl mt-5 ml-5">45</div>
          <div className="ml-5">Completed orders</div>
        </div>
      </div>
      {/* LİST */}
      <div>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <div>Ürün adı: {order.product_name}</div>
              <div>Adet: {order.quantity}</div>
              <div>Alıcı: {order.username}</div>
              <div>Sipariş tutarı: {order.unit_price * order.quantity} TL</div>
              <div>{order.status}</div>
              <div className="flex space-x-2 mt-2">
                {order.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        changeOrderStatus(true, order.order_detail_id)
                      }
                      className="px-3 py-2 text-white rounded-md bg-green-600"
                    >
                      Kabul et
                    </button>
                    <button
                      onClick={() =>
                        changeOrderStatus(false, order.order_detail_id)
                      }
                      className="px-3 py-2 text-white rounded-md bg-red-500"
                    >
                      Reddet
                    </button>
                  </>
                )}
                {order.status === "preparing" && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Kargo Kodu"
                      value={order.tracking_number}
                      className="px-3 py-2 border rounded-md"
                    />
                    <button className="px-3 py-2 text-white rounded-md bg-blue-500">
                      Kargoya Ver
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

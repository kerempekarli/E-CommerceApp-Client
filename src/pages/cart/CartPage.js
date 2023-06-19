import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { setToCart } from "../../stores/cart/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { closeModal, openModal } from "../../stores/modal/modalSlice";
import {
  addToCartAsync,
  removeFromCartAction,
} from "../../stores/cart/cartActions.js";
import { useNavigate, Link } from "react-router-dom";

const CartDetail = ({ setOpen }) => {
  const cart = useSelector((state) => state.cart);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const checkStockStatus = async (productId, sellerId) => {
    const response = await fetch(`http://localhost:3232/products/check-stock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, sellerId }),
    });

    const data = await response.json();
    return data.rows[0].stock; // Stok durumu sunucudan dönen yanıtın bir parçası olarak kabul edildiğinde uygun şekilde güncelleyin
  };

  const fetchCartItems = async () => {
    const token = Cookies.get("token");
    const response = await fetch("http://localhost:3232/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const updatedData = await data.map((item) => {
      return { ...item, id: item.product_id };
    });

    // Update stock status
    const updatedCartItems = await updateStockStatus(updatedData);
    dispatch(setToCart(updatedCartItems));

    return updatedCartItems;
  };

  const { data: cartItems, isLoading } = useQuery("cart", fetchCartItems);

  const handleAddToCart = async (product) => {
    const newProduct = {
      id: product.product_id,
      product_id: product.product_id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    };

    await dispatch(addToCartAsync(newProduct));

    // Update stock status
    await updateStockStatus(cart);
  };

  const handleDeleteToCart = async (product) => {
    const newProduct = {
      id: product.product_id,
      product_id: product.product_id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    };

    await dispatch(removeFromCartAction(newProduct));

    // Update stock status
    await updateStockStatus(cart);
  };

  const updateStockStatus = async (cartItems) => {
    const updatedCartItems = await Promise.all(
      cartItems.map(async (item) => {
        const stockStatus = await checkStockStatus(item.id, item.seller_id);
        return { ...item, inStockAmount: stockStatus };
      })
    );
    return updatedCartItems;
  };

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice = 0;

      cart?.forEach((item) => {
        console.log(item.price + "  " + item.quantity);
        const quantityPrice = parseFloat(item.price) * item.quantity;
        totalPrice += quantityPrice;
      });

      setTotalPrice(totalPrice.toFixed(2));
    };
    console.log(cart);
    calculateTotalPrice();
  }, [cart]);

  const handlePlaceOrder = () => {
    const outOfStockItems = cart.filter(
      (item) => item.quantity > item.inStockAmount
    );

    if (outOfStockItems.length > 0) {
      // Display warning message for out of stock items
      alert(
        "Some items are out of stock. Please adjust the quantity or remove them from your cart."
      );
    } else {
      // Proceed with the order
      alert("Order placed successfully!");
    }
  };

  return (
    <div className=" bg-gray-200 max-w-3xl mx-auto text-2xl py-5 px-10">
      <ul className="max-w-2xl flex justify-center">
        {cart.map((item, key) => (
          <li className="my-1 flex  space-x-2" key={key}>
            <div>
              {" "}
              {item.name} - {item.quantity}
            </div>
            {item.inStockAmount >= item.quantity ? (
              <span className="text-green-500">
                {" "}
                - Stokta {item.inStockAmount} tane var
              </span>
            ) : (
              <span className="text-red-500 ">
                {" "}
                - Stokta {item.inStockAmount} tane var
              </span>
            )}

            <div>
              <button
                onClick={() => {
                  handleDeleteToCart(item);
                }}
              >
                {" "}
                <FontAwesomeIcon
                  className="bg-red-500 p-1 text-white "
                  icon={faMinus}
                />
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  handleAddToCart(item);
                }}
              >
                <FontAwesomeIcon
                  className="text-white bg-green-500 p-1"
                  icon={faPlus}
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <div>TOTAL PRICE: {totalPrice}</div>
        <button
          onClick={handlePlaceOrder}
          className="py-2 block px-4 w-full mt-3 bg-green-700 text-white rounded-lg"
        >
          Sipariş ver
        </button>
      </div>
    </div>
  );
};

export default function CartDetailWrapper({ setOpen }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CartDetail setOpen={setOpen} />
    </QueryClientProvider>
  );
}

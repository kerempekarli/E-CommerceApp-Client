import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { setToCart } from "../../stores/cart/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import {
  addToCartAsync,
  removeFromCartAction,
} from "../../stores/cart/cartActions.js";
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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
    return updatedData;
  };

  const { data: cartItems, isLoading } = useQuery("cart", fetchCartItems, {
    onSuccess: (data) => {
      dispatch(setToCart(data));
    },
  });

  const handleAddToCart = (product) => {
    console.log("BUG SEEBEP BULMA ", product);
    const newProduct = {
      id: product.product_id,
      product_id: product.product_id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    };
    dispatch(addToCartAsync(newProduct));
  };
  const handleDeleteToCart = (product) => {
    const newProduct = {
      id: product.product_id,
      product_id: product.product_id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    };
    dispatch(removeFromCartAction(newProduct));
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

    calculateTotalPrice();
  }, [cart]);
  return (
    <div className="absolute max-h-96  overflow-scroll top-20 right-10 shadow-lg z-10 bg-gray-200 py-5 px-10">
      <ul>
        {cart.map((item, key) => (
          <li className="my-1 flex space-x-2" key={key}>
            <div>
              {" "}
              {item.name} - {item.quantity}
            </div>

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
        <div>TOTAL PRİCE : {totalPrice}</div>
        <button className="py-2 px-4 bg-green-700 text-white rounded-lg mt-1">
          Sipariş ver
        </button>
      </div>
    </div>
  );
};

export default function CartWrapper() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Cart />
    </QueryClientProvider>
  );
}

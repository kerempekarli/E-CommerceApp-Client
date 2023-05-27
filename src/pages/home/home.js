import React, { useState, useEffect } from "react";
import photo from "../../assets/61OJd5M+4nL._AC_UF1000,1000_QL80_.jpg";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addToCartAsync,
  removeFromCartAction,
  clearCartAction,
} from "../../stores/cart/cartActions.js";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch("http://localhost:3232/products", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Product fetch error:", error);
      }
    };

    fetchProducts();
  }, []);
  const imageUrl =
    "https://m.media-amazon.com/images/I/61NRYreJ2cL._AC_UF1000,1000_QL80_.jpg";

  const handleAddToCart = (product) => {
    console.log(product);

    dispatch(addToCartAsync(product));
  };

  return (
    <>
      <div className="mx-auto max-w-[1300px]">
        <div className="">
          <ul className="text-white flex flex-wrap">
            {products.length > 0 &&
              products?.map((product) => (
                <li key={product.id} className="mr-auto shadow-md my-2 border">
                  <div className="w-64 h-92 bg-white m-5">
                    <div className="w-64">
                      <img
                        crossOrigin="anonymous"
                        src={imageUrl}
                        alt="macbook"
                        className="p-3 object"
                      ></img>
                    </div>
                    <div className="pl-2 pr-1 font-medium text-md text-gray-700 leading-5">
                      <p>{product.description}</p>
                      <p className="pl-3 font-bold text-xl mt-3 text-md text-green-700 leading-5">
                        {product.price}
                      </p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-green-600 mt-5 px-5 py-2 text-xl font-medium text-white"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike } from "../../stores/likes/likeAction";
import Cookies from "js-cookie";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [token] = useState(() => {
    return Cookies.get("token");
  });
  const dispatch = useDispatch();
  const likedProducts = useSelector((state) => state.likes);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3232/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id, token]);

  const handleLike = () => {
    if (likedProducts.includes(id)) {
      console.log("LİKED PRODUCTS", token);
      dispatch(removeLike(id, token));
    } else {
      console.log("LİKED PRODUCTS", token);
      dispatch(addLike(id, token));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{product?.name}</h2>
      <img
        crossOrigin="anonymous"
        src={product?.product_image}
        alt={product?.name}
        className="mb-4"
      />
      <p className="text-gray-600 mb-4">{product?.description}</p>
      <p className="text-gray-800 font-semibold">Price: {product?.price}</p>
      <p className="text-gray-400 text-xs mt-4">
        Created At: {product?.created_at}
      </p>
      <button onClick={handleLike}>
        <FontAwesomeIcon
          icon={faHeart}
          color={likedProducts.includes(id) ? "red" : "inherit"}
        />
      </button>
    </div>
  );
};

export default ProductDetailPage;

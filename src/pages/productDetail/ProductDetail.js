import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addLike,
  removeLike,
  fetchLikedProducts,
} from "../../stores/likes/likeAction";
import Cookies from "js-cookie";

const ProductDetailPage = () => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLiked, setLike] = useState(false);

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
        await setProduct(response.data);
        await dispatch(fetchLikedProducts());
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id, dispatch]);
  useEffect(() => {
    id = parseInt(id);
    const isLiked = likedProducts.includes(id);
    console.log("İS LİKED ", likedProducts);
    console.log("İS LİKED ");
    setLike(isLiked);
  }, [likedProducts, id]);

  const handleLike = () => {
    id = parseInt(id);
    if (likedProducts.includes(id)) {
      dispatch(removeLike(id, token));
    } else {
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
          className="fa-2x mt-2"
          color={isLiked ? "red" : "inherit"}
        />
      </button>
    </div>
  );
};

export default ProductDetailPage;

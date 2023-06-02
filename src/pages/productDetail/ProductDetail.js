import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faShoppingCart,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addLike,
  removeLike,
  fetchLikedProducts,
} from "../../stores/likes/likeAction";
import {
  addToCartAsync,
  removeFromCartAction,
  setToCartAction,
} from "../../stores/cart/cartActions.js";
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "../../stores/wishlist/wishlistActions.js";
import Cookies from "js-cookie";

const ProductDetailPage = () => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLiked, setLike] = useState(false);
  const [isInCart, setInCart] = useState(false);
  const [isInWishlist, setInWishlist] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editCommentIndex, setEditCommentIndex] = useState(-1);

  const [token] = useState(() => {
    return Cookies.get("token");
  });
  const dispatch = useDispatch();
  const likedProducts = useSelector((state) => state.likes);
  const cartProducts = useSelector((state) => state.cart);
  const wishlistProducts = useSelector((state) => state.wishlist);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3232/products/${id}`
        );
        setProduct(response.data);
        dispatch(fetchLikedProducts());
        dispatch(setToCartAction());
        dispatch(fetchWishlist());
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id, dispatch]);

  useEffect(() => {
    const parsedId = parseInt(id);
    const isLiked = likedProducts?.includes(parsedId);
    const isInCart = cartProducts?.some((item) => item.product_id === parsedId);
    const isInWishlist = wishlistProducts.some(
      (item) => item.product_id === parsedId
    );
    console.log("CART PRODUCTS IZLEME ", isInCart);
    console.log("CART PRODUCTS IZLEME ", cartProducts);

    setLike(isLiked);
    setInCart(isInCart);
    setInWishlist(isInWishlist);
  }, [likedProducts, cartProducts, wishlistProducts, id]);

  const handleLike = () => {
    const parsedId = parseInt(id);
    if (isLiked) {
      dispatch(removeLike(parsedId, token));
    } else {
      dispatch(addLike(parsedId, token));
    }
  };

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(removeFromCartAction(product));
    } else {
      dispatch(addToCartAsync(product));
    }
  };

  const handleAddToWishlist = () => {
    const parsedId = parseInt(id);
    if (isInWishlist) {
      console.log("SİLME İŞLEMİ İSTEK LİSTESİ");
      dispatch(removeFromWishlist(parsedId));
    } else {
      console.log("EKLEME İŞLEMİ İSTEK LİSTESİ");
      dispatch(addToWishlist(parsedId));
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (editCommentIndex === -1) {
      // Yeni yorum ekleme
      setComments([...comments, comment]);
    } else {
      // Yorumu düzenleme
      const updatedComments = [...comments];
      updatedComments[editCommentIndex] = comment;
      setComments(updatedComments);
      setEditCommentIndex(-1);
    }
    setComment("");
  };

  const handleCommentEdit = (index) => {
    setComment(comments[index]);
    setEditCommentIndex(index);
  };

  const handleCommentDelete = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
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
      <div className="flex justify-center mt-4">
        <button onClick={handleLike} className="mr-4">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className={`text-2xl ${
              isLiked ? "text-green-500" : "text-gray-500"
            }`}
          />
        </button>
        <button onClick={handleAddToCart} className="mr-4">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className={`text-2xl ${
              isInCart ? "text-yellow-500" : "text-gray-500"
            }`}
          />
        </button>
        <button onClick={handleAddToWishlist}>
          <FontAwesomeIcon
            icon={faHeart}
            className={`text-2xl ${
              isInWishlist ? "text-red-500" : "text-gray-500"
            }`}
          />
        </button>
      </div>
      <ul>
        {comments?.map((comment, index) => (
          <li key={index}>
            {comment}
            <button onClick={() => handleCommentEdit(index)}>Edit</button>
            <button onClick={() => handleCommentDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <textarea value={comment} onChange={handleCommentChange} />
        <button type="submit">
          {editCommentIndex === -1 ? "Add Comment" : "Update Comment"}
        </button>
      </form>
    </div>
  );
};

export default ProductDetailPage;

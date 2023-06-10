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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import CheckoutForm from "../../components/stripeContainer";
import io from "socket.io-client";
import SellerList from "../../components/sellerList/sellerList";

const ProductDetailPage = () => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const [isLiked, setLike] = useState(false);
  const [isInCart, setInCart] = useState(false);
  const [isInWishlist, setInWishlist] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editCommentIndex, setEditCommentIndex] = useState(-1);
  const [orderStatus, setOrderStatus] = useState("");

  const [token] = useState(() => {
    return Cookies.get("token");
  });
  const dispatch = useDispatch();
  const likedProducts = useSelector((state) => state.likes);
  const cartProducts = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const wishlistProducts = useSelector((state) => state.wishlist);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3232/products/${id}`
        );
        setProducts(response.data.products);
        setProduct(response.data.products[0]);

        console.log("PRODUCT,", response.data);
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
    console.log("IS IN CART", isInCart);
    console.log("CART PRODUCTS", cartProducts);

    setLike(isLiked);
    setInCart(isInCart);
    setInWishlist(isInWishlist);
  }, [likedProducts, cartProducts, wishlistProducts, id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3232/products/${id}/get-comments`
        );
        const commentsData = response.data;
        setComments(commentsData);
        console.log(commentsData);
      } catch (error) {
        console.error("Error while fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);
  useEffect(() => {
    console.log("USER_ID_KONTROLÜ ", user.user.id);
    // Socket.io sunucusuna bağlan
    const socket = io("http://localhost:3002");

    socket.on("connect", () => {
      console.log("Socket.io bağlantısı kuruldu");
      const roomId = user.user.id; // User_id'yi string olarak alın

      // Odaya katıl
      socket.emit("joinRoom", roomId);
    });

    socket.on("updateOrderStatus", ({ status }) => {
      // Sipariş durumu güncellendiğinde yapılacak işlemler
      setOrderStatus(status);
      console.log("ksadgkskgsakgdskagkdasgksad");

      // Bildirim gönder
      toast.success(`Sipariş durumu güncellendi: ${status}`);
    });

    // Component temizlendiğinde Socket.io bağlantısını kapat
    return () => {
      socket.disconnect();
    };
  }, [user]);

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
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (editCommentIndex === -1) {
      try {
        const token = await Cookies.get("token");
        const productId = id * 1;
        await axios.post(
          `http://localhost:3232/products/${productId}/add-comment`,
          {
            comment: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchComments();
      } catch (error) {
        console.error("Error while adding comment:", error);
      }
    } else {
      // Yorumu düzenleme
      try {
        const commentId = comments[editCommentIndex].id;
        await axios.put(
          `http://localhost:3232/products/${id}/comments/${commentId}`,
          {
            comment: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchComments();
        setEditCommentIndex(-1);
      } catch (error) {
        console.error("Error while updating comment:", error);
      }
    }
    setComment("");
  };
  const handleCommentEdit = (index) => {
    setComment(comments[index].comment);
    setEditCommentIndex(index);
  };
  const handleCommentDelete = async (index) => {
    try {
      const commentId = comments[index].id;
      const token = await Cookies.get("token");
      await axios.delete(
        `http://localhost:3232/products/${id}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchComments();
    } catch (error) {
      console.error("Error while deleting comment:", error);
    }
  };
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3232/products/${id}/get-comments`
      );
      const commentsData = response.data;
      setComments(commentsData);
      console.log(commentsData);
    } catch (error) {
      console.error("Error while fetching comments:", error);
    }
  };
  const handleSelectSeller = async (products, seller_id) => {
    if (!products || products.length === 0) {
      // products dizisi boş veya gelmediği durumu ele al
      console.error("No products available.");
      return;
    }

    for (let i = 0; i < products.length; i++) {
      if (products[i].seller_id === seller_id) {
        setProduct(products[i]);
        return; // Eşleşen objeyi bulduktan sonra fonksiyondan çık
      }
    }

    // Eşleşen obje bulunamadıysa
    console.error("No matching product found.");
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
      {/* COMMENTS */}
      <div className="">
        {" "}
        <ul>
          {comments?.map((comment, index) => (
            <li
              className={`bg-gray-300 flex space-x-3 justify-between ${(comment.user_id =
                id ? "bg-green-100" : "bg-gray-300")}`}
              key={index}
            >
              {comment.comment}
              <div>
                <button
                  className="bg-yellow-500 p-2 rounded-lg"
                  onClick={() => handleCommentEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 p-2 rounded-lg"
                  onClick={() => handleCommentDelete(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <form
          className="flex justify-center mt-5"
          onSubmit={handleCommentSubmit}
        >
          <div>
            <textarea
              className="outline-0 bg-gray-100 block"
              value={comment}
              onChange={handleCommentChange}
            />
          </div>
          <button
            className="bg-green-500 flex-grow-0 p-2 rounded-lg "
            type="submit"
          >
            {editCommentIndex === -1 ? "Add Comment" : "Update Comment"}
          </button>
        </form>
      </div>
      <CheckoutForm></CheckoutForm>
      {/* SELLER LİST */}
      <SellerList
        productDTO={products}
        onSelectSeller={handleSelectSeller}
        product={product}
      ></SellerList>
    </div>
  );
};

export default ProductDetailPage;

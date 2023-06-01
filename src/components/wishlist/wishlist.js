import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "../../stores/wishlist/wishlistActions.js";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const [isOpen, setIsOpen] = useState(false);

  const toggleWishlist = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(fetchWishlist());
    console.log("ÇALIŞTI");
  }, [dispatch]);

  return (
    <button onClick={toggleWishlist} className="relative">
      <FontAwesomeIcon
        icon={faHeart}
        className="cursor-pointer text-red-500 ml-2"
      />
      {isOpen && (
        <ul className="absolute top-10">
          {wishlist?.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </button>
  );
};

export default Wishlist;

import React from "react";

const SellerList = ({ productDTO, onSelectSeller, product }) => {
  const filteredSellers = productDTO?.filter(
    (seller) => seller.id !== product.seller_id
  );

  return (
    <div>
      <h2>Sellers</h2>
      <ul>
        {filteredSellers?.map((seller) => (
          <li key={seller.seller_id}>
            <button onClick={() => onSelectSeller(seller.seller_id)}>
              {seller.seller_name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerList;

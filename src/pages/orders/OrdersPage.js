import React from "react";

export default function OrdersPage() {
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
    </div>
  );
}

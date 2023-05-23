import React from "react";
import photo from "../../assets/61OJd5M+4nL._AC_UF1000,1000_QL80_.jpg";

export default function Home() {
  return (
    <>
      <div className="mx-auto flex justify-start flex-wrap bg-black w-4/6">
        <div className=" flex flex-wrap">
          <div className="w-64 h-72 bg-white m-5">
            <img src={photo} alt="macbook" className="p-3"></img>
            <div className="pl-2 pr-1 font-medium text-md text-gray-700 leading-5">
              <p>
                The Purest Solutions, Leke Karşıtı ve Leke Görünümü Azaltıcı
              </p>
              <p className="pl-3 font-bold text-xl pt-2 text-md text-green-700 leading-5">
                700 TL
              </p>
            </div>
          </div>
          <div className="w-52 h-52 bg-white m-5"></div>
          <div className="w-52 h-52 bg-white m-5"></div>
          <div className="w-52 h-52 bg-white m-5"></div>
          <div className="w-52 h-52 bg-white m-5"></div>
          <div className="w-52 h-52 bg-white m-5"></div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../stores/categories/categoriesSlice";

const CategoriesPage = () => {
  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories()); // Sayfa yüklendiğinde kategorileri getirmek için eylemi tetikliyoruz
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="mx-auto max-w-[1300px]">
        <div className="">
          <ul className="text-white mt-20 flex flex-wrap">
            {categories.map((category) => (
              <li key={category.id} className="mr-auto border-2 shadow-xl">
                <div className="w-64 h-92 bg-white m-5">
                  <div className="">
                    <img
                      crossOrigin="anonymous"
                      src="https://images.pexels.com/photos/3766180/pexels-photo-3766180.jpeg?cs=srgb&dl=pexels-alex-azabache-3766180.jpg&fm=jpg"
                      alt="macbook"
                      className="p-3 w-64 h-64 object-cover"
                    ></img>
                  </div>
                  <div className="pl-2 pr-1 font-medium text-md text-gray-700 leading-5">
                    <p className="text-2xl">{category.name}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;

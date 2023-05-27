import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    photo: null,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3232/categories");
        console.log(response);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log("Kategorileri alırken bir hata oluştu:", error);
      }
    };
    fetchCategories();
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("NAME ", name, "VALUE ", value);
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handlePhotoChange = (event) => {
    const photo = event.target.files[0];
    setProduct((prevProduct) => ({
      ...prevProduct,
      photo,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = Cookies.get("token");
    try {
      console.log(product);
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category_id", product.category_id);
      formData.append("photo", product.photo);

      await axios.post("http://localhost:3232/products/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProduct({
        name: "",
        description: "",
        price: "",
        category_id: "",
        photo: null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
          Price:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 font-bold mb-2"
        >
          Category:
        </label>
        <select
          id="category_id"
          name="category_id"
          value={product.category_id}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">
          Photo:
        </label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handlePhotoChange}
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Add Product
      </button>
    </form>
  );
}

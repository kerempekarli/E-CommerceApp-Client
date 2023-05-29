import React, { useState } from "react";

const CategoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // İstek sonucunu burada işleyebilirsiniz
        console.log(data);
      })
      .catch((error) => {
        // Hata durumunda burada işleyebilirsiniz
        console.error(error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Kategori Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Kategori Adı
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Kategori Adı"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;

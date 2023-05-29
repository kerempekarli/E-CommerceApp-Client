import React, { useState } from "react";

const SellerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passport1: "",
    passport2: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.passport1 !== formData.passport2) {
      alert("Pasaportlar eşleşmiyor!");
      return;
    }

    fetch("http://localhost:3232/sellers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
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
      <h2 className="text-2xl mb-4">Satıcı Kaydı</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            İsim
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="İsim"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            E-posta
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="E-posta"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="passport1"
          >
            Pasaport
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="passport1"
            name="passport1"
            type="password"
            placeholder="Pasaport"
            value={formData.passport1}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="passport2"
          >
            Pasaport (Tekrar)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="passport2"
            name="passport2"
            type="password"
            placeholder="Pasaport (Tekrar)"
            value={formData.passport2}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Kayıt Ol
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerRegister;

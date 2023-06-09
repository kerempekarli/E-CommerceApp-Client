import axios from "axios";
import Cookies from "js-cookie";

export const learnUserRole = async (setRole) => {
  try {
    const token = Cookies.get("token");
    if (token) {
      const response = await axios.get(
        "http://localhost:3232/roles/learn-role",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // response.data içerisinde kullanıcının rolü yer alacaktır
      const userRole = response.data.role_name;
      console.log("CHECK ROLE ", userRole);
      setRole(userRole);
      return userRole;
    } else {
      return "guest";
    }
    // Kullanıcının rolüne göre sayfayı render etmek veya yönlendirme yapmak için işlemler yapabilirsiniz
  } catch (error) {
    console.log(error);
  }
};

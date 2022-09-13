import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.confirm("Bạn có muốn đăng xuất")) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/admin";
    } else {
      navigate(-1);
    }
  }, []);
};

export default LogoutAdmin;

import React from "react";
import { useEffect } from "react";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (window.confirm("Bạn có muốn đăng xuất")) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      navigate(-1);
    }
  }, []);
};

export default Logout;

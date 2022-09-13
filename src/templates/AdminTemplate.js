import React from "react";
import { Link, Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import { userRole } from "../utils/settings/config";

const AdminTemplate = () => {
  if (!userRole.length) {
    return (
      <div>
        <div
          className="p-4 my-5 text-sm text-red-700 bg-red-100 rounded-lg "
          role="alert"
        >
          Hãy đăng nhập để xem trang Quản trị!
        </div>
        <Link
          to="/login"
          className="hover:text-red-500 text-center block p-2 text-white bg-blue-500"
        >
          Đăng nhập
        </Link>
      </div>
    );
  }

  if (userRole !== "ADMIN") {
    return (
      <div>
        <div
          className="p-4 my-5 text-sm text-red-700 bg-red-100 rounded-lg "
          role="alert"
        >
          Tài khoản của bạn không có quyền truy cập trang quản trị!
        </div>
        <Link
          to="/"
          className="hover:text-red-500 text-center block p-2 text-white bg-blue-500"
        >
          Quay lại Trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  );
};

export default AdminTemplate;

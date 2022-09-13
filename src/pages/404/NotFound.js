import React from "react";
import not_found from "../../assets/img/notfound.png";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="px-20 py-10 not-found-page">
      <div className="containerss flex flex-row items-center justify-center">
        <div className="col-left flex flex-col w-1/2 items-center leading-tight">
          <h1>Oops!</h1>
          <h3>404</h3>
          <h5>Không tìm thấy trang</h5>
          <div>
            <button
              className="p-2 rounded-md text-white ease-in-out duration-300 mt-3 font-bold"
              onClick={() => {navigate('/')}}
            >
              Về trang chủ
            </button>
          </div>
        </div>
        <div className="col-right w-1/2">
          <img
            src={not_found}
            alt="not_found"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;

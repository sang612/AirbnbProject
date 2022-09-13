import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocationShowing } from "../../slices/location";
import parse from "html-react-parser";
import logo from "../../assets/img/default_img.jpg";
import { NavLink } from "react-router-dom";

const Locations = () => {
  const { locations, isLoading, error } = useSelector((state) => state.location);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocationShowing());
  }, []);
  const [limit, setLimit] = useState(20);

  const saveLocationToStorage = (value) => {
    localStorage.setItem("locationParams", JSON.stringify(value));
  };

  if (isLoading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (error) {
    return <div className="loading">Có lỗi xảy ra... </div>;
  }

  return (
    <div>
      <div className="flex flex-row flex-wrap locations my-7">
        {locations.length ? (
          locations
            .slice(0, limit ? limit : locations.length)
            .map((location, index) => {
              return (
                <div
                  key={index}
                  className="card mx-auto my-1 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                >
                  <NavLink
                    onClick={() => {
                      saveLocationToStorage(location);
                    }}
                    to={`room/${location._id}`}
                  >
                    <img
                      className="rounded-t-lg h-60 w-full"
                      src={location.image ? location.image : logo}
                    />
                  </NavLink>
                  <div className="p-5">
                    <NavLink
                      to={`room/${location._id}`}
                      onClick={() => {
                        saveLocationToStorage(location);
                      }}
                    >
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {location.name}
                      </h5>
                    </NavLink>
                    <div>
                      <span className="font-bold mb-3 text-gray-700 dark:text-gray-400">
                        {location.province}
                      </span>
                      &nbsp;-&nbsp;
                      <span className="font-bold mb-3 text-gray-700 dark:text-gray-400">
                        {location.country}
                      </span>
                    </div>
                    <div className="flex items-center mt-2.5 mb-5">
                      Đánh giá:
                      <span className="flex flex-row items-center bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                        <div className="text-sm">
                          {" "}
                          {location.valueate ? location.valueate : "Chưa có"}
                        </div>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 ml-1 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </span>
                    </div>
                    <NavLink
                      to={`room/${location._id}`}
                      onClick={() => {
                        saveLocationToStorage(location);
                      }}
                      className="button inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white  rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Xem danh sách phòng
                      <svg
                        aria-hidden="true"
                        className="ml-2 -mr-1 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </NavLink>
                  </div>
                </div>
              );
            })
        ) : (
          <span className="not-found italic">
            Không tìm thấy vị trí nào!{" "}
            <i className="fa-solid fa-face-frown"></i>
          </span>
        )}
      </div>

      {!(limit >= locations.length-1) ? (
        <button
        className="mb-5 flex items-center m-auto see-more text-white rounded-md py-1 px-5 ease-in-out duration-300"
        onClick={() => {
          setLimit(limit + 50);
        }}
      >
        Xem thêm <i className="ml-1 text-sm fa-solid fa-arrow-down"></i>
      </button>
      ) : ''}
    </div>
  );
};

export default Locations;

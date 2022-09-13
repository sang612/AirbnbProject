import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  NavLink,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { getRoomByLocationId } from "../../slices/room";
import Zoom from "react-medium-image-zoom";
import hotel_default_image from "../../assets/img/hotel-default-image.png";
import { useState } from "react";

const RoomList = () => {
  const { locationId } = useParams();
  const { rooms, isLoading, error } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRoomByLocationId(locationId));
  }, []);

  const convertNumberToVnd = (value) => {
    if (value) {
      value = value.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      return value;
    }

    return "...";
  };

  if (isLoading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (error) {
    return <div className="loading">Có lỗi xảy ra... </div>;
  }

  const renderService = (value) => {
    let service = [];
    if (value.wifi) service.push("wifi");
    if (value.elevator) service.push("thang máy");
    if (value.gym) service.push("gym");
    if (value.hotTub) service.push("bồn nước nóng");
    if (value.pool) service.push("hồ bơi");
    if (value.indoorFireplace) service.push("lò sưởi trong nhà");
    if (value.dryer) service.push("máy sấy");
    if (value.kitchen) service.push("bếp");
    if (value.heating) service.push("lò sưởi");
    if (value.cableTV) service.push("truyền hình cáp");
    if (service.length > 4) {
      service = service.splice(0, 4);
      service.push("...");
    }

    service = service.join(", ");

    return service;
  };

  let location = {};
  if (localStorage.getItem("locationParams")) {
    location = JSON.parse(localStorage.getItem("locationParams"));
  }

  return (
    <div className="px-20 rooms">
      <div className="location-info my-5 flex flex-row items-center justify-around">
        <div>
          <p className="text-2xl">
            <i className="fa-solid fa-location-dot location-icon"></i>{" "}
            <b>{location ? location.name : ""}</b>
          </p>
          <span className="text-lg italic ">
            {location ? location.province : ""} -{" "}
            {location ? location.country : ""}
          </span>
        </div>
        <Zoom className="mr-auto">
          <img
            src={location ? location.image : ""}
            alt=""
            className="max-h-96 max-w-auto rounded-lg "
          />
        </Zoom>
      </div>

      <h1 className="text-xl font-bold">Danh sách phòng: </h1>

      <div className="room-info flex flex-row flex-wrap my-5">
        {rooms.length ? (
          rooms.map((room, index) => {
            return (
              <a
                onClick={() => {
                  navigate(`/roomDetail/${room._id}`);
                }}
                key={index}
                href=""
                className="card ease-in-out duration-500  flex flex-col items-center mr-5 mb-3 bg-white rounded-lg border shadow-md md:flex-row md:max-w-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  className="room-image object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={room.image ? room.image : hotel_default_image}
                  alt="..."
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="card-title ease-in-out duration-500 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {room.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                    {room.guests} khách | {room.bedRoom} phòng ngủ | {room.bath}{" "}
                    phòng tắm
                    <br />
                    <br />
                    <i className="fa-solid fa-clipboard-list text-black"></i> :{" "}
                    {renderService(room)}
                  </p>
                  <span className="ml-auto pr-0">
                    <i className="fa-solid fa-coins text-yellow-500"></i>{" "}
                    <b>: {convertNumberToVnd(room.price)} </b>/đêm
                  </span>
                </div>
              </a>
            );
          })
        ) : (
          <h2 className="text-xl italic">
            Hiện chưa có phòng{" "}
            <i className="fa-solid fa-face-frown text-gray-700"></i>
          </h2>
        )}
      </div>
    </div>
  );
};

export default RoomList;

import React, { useEffect, useState } from "react";
import ElogDateTime from "../../components/ElogDateTime/ElogDateTime";
import Zoom from "react-medium-image-zoom";
import { useDispatch, useSelector } from "react-redux";
import { bookingRoom, getRoomDetail } from "../../slices/room";
import { useParams } from "react-router-dom";
import defaultImg from "../../assets/img/default_roomDetail.jpg";
import { getReviewByRoomId } from "../../slices/review";
import moment from "moment";
import CustomizedDialogs from "../../components/Dialog/Dialog";
import WriteReviewForm from "../../components/WriteReviewForm/WriteReviewForm";
import { userfromLocal } from "../../utils/settings/config";
import avatar_default from "../../assets/img/avatardefault.jpg"

const RoomDetails = () => {
  const { roomId } = useParams();
  const [myDateRecieve, setMyDateRecieve] = useState(null);
  const [myDateReturn, setmyDateReturn] = useState(null);
  const [messageError, setMessageError] = useState();
  const { roomDetail } = useSelector((state) => state.room);
  const { reviews, isLoading, error  } = useSelector((state) => state.review);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomDetail(roomId));
    dispatch(getReviewByRoomId(roomId));
    caculateDate();
  }, []);

  const caculateDate = (myDateRecieve, myDateReturn) => {
    if (myDateRecieve != null || myDateReturn != null) {
      let Rec = new Date(myDateRecieve);
      let Ret = new Date(myDateReturn);
      let exactDate = (Ret - Rec) / (1000 * 60 * 60 * 24);

      exactDate = Math.round(exactDate);

      if (exactDate <= 0) return "";

      return exactDate;
    }
    return 0;
  };

  const convertNumberToVnd = (value) => {
    value = value.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    return value;
  };

  let service_icons = [];
  const renderService = (value) => {
    let service = [];

    if (value.wifi) {
      service.push("wifi");
      service_icons.push("wifi");
    }
    if (value.elevator) {
      service.push("thang máy");
      service_icons.push("elevator");
    }
    if (value.gym) {
      service.push("gym");
      service_icons.push("dumbbell");
    }
    if (value.hotTub) {
      service.push("bồn nước nóng");
      service_icons.push("hot-tub-person");
    }
    if (value.pool) {
      service.push("hồ bơi");
      service_icons.push("person-swimming");
    }
    if (value.indoorFireplace) {
      service.push("lò sưởi trong nhà");
      service_icons.push("fire");
    }
    if (value.dryer) {
      service.push("máy sấy khô");
      service_icons.push("dumpster-fire");
    }
    if (value.kitchen) {
      service.push("bếp");
      service_icons.push("kitchen-set");
    }
    if (value.heating) {
      service.push("lò sưởi");
      service_icons.push("temperature-arrow-up");
    }
    if (value.cableTV) {
      service.push("truyền hình cáp");
      service_icons.push("tv");
    }

    return service;
  };

  const convertDateFormat = (value) => {
    let date = moment(value).format("DD/MM/YYYY hh:mm:ss A");

    return date;
  };

  const handleBookingRoom = () => {
    if (myDateRecieve == null || myDateReturn == null) {
      setMessageError("Vui lòng chọn thời gian checkin và checkout!");
      return;
    }

    if (myDateRecieve > myDateReturn) {
      setMessageError("Vui lòng chọn thời gian checkin và checkout hợp lệ!");
      return;
    }

    if (!userfromLocal) {
      setMessageError("Vui lòng đăng nhập để đặt phòng!");
      return;
    }

    setMessageError("");
    const info = {
      roomId: roomId,
      checkIn: myDateRecieve,
      checkOut: myDateReturn,
    };
    dispatch(bookingRoom(info));
  };

  if (isLoading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (error) {
    return <div className="loading">Có lỗi xảy ra... </div>;
  }

  return (
    <div className="px-20 room-detail">
      <h1 className="font-bold text-2xl">
        {roomDetail.name ? roomDetail.name : ""}
      </h1>
      <div className="flex flex-row items-center">
        <svg
          aria-hidden="true"
          className="w-5 h-5 ml-1 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <span className="font-bold">4,83</span>
        <span className="ml-3 my-3 text-gray-600 underline">
          {roomDetail.locationId
            ? roomDetail.locationId.name +
              " - " +
              roomDetail.locationId.province +
              " - " +
              roomDetail.locationId.country
            : ""}
        </span>
      </div>
      <div>
        <Zoom>
          <img
            src={roomDetail.image ? roomDetail.image : defaultImg}
            alt=""
            className="rounded-lg max-h-96 w-auto"
          />
        </Zoom>
      </div>
      <div className="about my-3">
        <p className="text-gray-600 italic">
          {roomDetail
            ? roomDetail.guests +
              " khách - " +
              roomDetail.bedRoom +
              " phòng ngủ - " +
              roomDetail.bath +
              " phòng tắm"
            : ""}
        </p>
        <hr className="my-2" />
        <div className="about-detail flex flex-row items-center">
          <ul className="list-service flex flex-col items-start justify-center w-2/3">
            <li className="mb-3 text-gray-600">
              <div className="flex flex-row items-center">
                <i className="fa-solid mr-3 fa-house"></i>
                <div>
                  <h3 className="font-bold text-black">Toàn bộ nhà</h3>
                  <span>Bạn sẽ có chung cư cao cấp cho riêng mình. </span>
                </div>
              </div>
            </li>
            <li className="mb-3 text-gray-600">
              <div className="flex flex-row items-center">
                <i className="fa-solid mr-3 fa-hand-sparkles"></i>
                <div>
                  <h3 className="font-bold text-black">Vệ sinh tăng cường</h3>
                  <span>
                    Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng
                    cường 5 bước của Airbnb.
                  </span>
                </div>
              </div>
            </li>
            <li className="mb-3 text-gray-600">
              <div className="flex flex-row items-center">
                <i className="fa-solid mr-3 fa-user-shield"></i>
                <div>
                  <h3 className="font-bold text-black">Chủ nhà siêu cấp</h3>
                  <span>
                    Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh
                    giá cao và là những người cam kết mang lại quãng thời gian ở
                    tuyệt vời cho khách.
                  </span>
                </div>
              </div>
            </li>
            <li className="mb-3 text-gray-600">
              <div className="flex flex-row items-center">
                <i className="fa-solid mr-3 fa-calendar-minus"></i>
                <div>
                  <h3 className="font-bold text-black">
                    Miễn phí hủy trong 48 giờ
                  </h3>
                </div>
              </div>
            </li>
          </ul>

          <div className="datphong w-1/3">
            <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl hover:border-gray-300 ease-in-out duration-300 ">
              <div className="flex flex-row items-center justify-between">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {roomDetail.price
                    ? convertNumberToVnd(roomDetail.price) + " / đêm"
                    : "Liên hệ để biết giá"}
                </h5>
                <div className="flex flex-row">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 ml-1 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span>4,83</span>
                </div>
              </div>

              <div className="mb-3 uppercase datetime-input">
                <span className="font-bold text-xs">Nhận phòng:</span>
                <ElogDateTime
                  handleChange={(val) => {
                    setMyDateRecieve(val);
                  }}
                />
              </div>

              <div className="mb-3 uppercase datetime-input">
                <span className="font-bold text-xs">Trả phòng:</span>
                <ElogDateTime
                  handleChange={(val) => {
                    setmyDateReturn(val);
                  }}
                />
              </div>
              <span className="italic text-red-500 mt-5">{messageError}</span>
              <button
                onClick={() => {
                  handleBookingRoom();
                }}
                className="checkout-button ease-in-out duration-300 w-full inline-flex items-center justify-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Đặt phòng
              </button>
              <div className="mt-5">
                <p className="flex flex-row justify-between text-base text-gray-600">
                  <span className="underline">
                    {roomDetail.price
                      ? convertNumberToVnd(roomDetail.price)
                      : "0"}{" "}
                    x {caculateDate(myDateRecieve, myDateReturn)} đêm
                  </span>
                  <span>
                    {convertNumberToVnd(
                      roomDetail.price *
                        caculateDate(myDateRecieve, myDateReturn)
                    )}
                  </span>
                </p>
                <hr className="my-1" />
                <p className="flex flex-row justify-between font-bold text-lg">
                  <span>Tổng</span>
                  <span>
                    {convertNumberToVnd(
                      roomDetail.price *
                        caculateDate(myDateRecieve, myDateReturn)
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-2/3 my-5" />

        <div className="service">
          <h1 className="text-lg font-bold my-2">Tiện nghi</h1>
          <div className="grid grid-cols-2 gap-3 w-2/3">
            {renderService(roomDetail).map((sv, index) => {
              return (
                <div className="flex flex-row items-center" key={index}>
                  <i
                    className={"fa-solid mr-2 " + "fa-" + service_icons[index]}
                  ></i>
                  <span>{sv}</span>
                </div>
              );
            })}
          </div>
        </div>

        <hr className=" my-5" />

        <div className="review">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <svg
                aria-hidden="true"
                className="w-5 h-5 ml-1 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>

              {reviews.length ? (
                <div className="mr-2">
                  <span className="font-bold">4,83&nbsp;</span>({reviews.length}{" "}
                  đánh giá)
                </div>
              ) : (
                <h1 className="font-bold italic mr-2">&nbsp;Chưa có đánh giá</h1>
              )}
            </div>
            <CustomizedDialogs
              title="Viết đánh giá"
              textTrigger="Viết đánh giá"
              warningMessage="Vui lòng đăng nhập để viết đánh giá!"
            >
              <WriteReviewForm roomId={roomId} />
            </CustomizedDialogs>
          </div>
          <div className="grid grid-cols-2 gap-7 my-7">
            {reviews.length
              ? reviews.map((review, index) => {
                  return (
                    <div className="flex flex-col " key={index}>
                      <div className="flex flex-row items-center">
                        <img
                          className="rounded-full w-10 h-10 mr-2"
                          src={review.userId ? review.userId.avatar : avatar_default}
                          alt={review.userId ? review.userId.name : ""}
                        />
                        <div className="flex flex-col items-start">
                          <h3 className="font-bold text-base">
                            {review.userId ? review.userId.name : "Ẩn danh"}
                          </h3>
                          <span className="text-xs text-gray-600">
                            {convertDateFormat(review.created_at)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm mt-3">{review.content}</p>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;

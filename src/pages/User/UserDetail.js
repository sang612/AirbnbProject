import React, { useState } from "react";
// import { user } from "../../utils/settings/config";
import avatar_default from "../../assets/img/avatardefault.jpg";
import moment from "moment";
import { useFormik } from "formik";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { getCurrentUser, updateAvatar, updateUser } from "../../slices/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userfromLocal } from "../../utils/settings/config";
import CustomizedDialogs from "../../components/Dialog/Dialog";
import BookingList from "./BookingList";

const UserDetail = () => {
  const [disableAttribute, setDisableAttribute] = useState(true);
  const { user, isLoading, error  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: user?.password || "",
      birthday: user?.birthday || "",
      phone: user.phone || "",
      address: user?.address || "",
      gender: user?.gender,
      type: user?.type || "",
    },
    onSubmit: (values) => {
      //goi api
      dispatch(updateUser(values));
      dispatch(getCurrentUser());
    },
  });

  const enableInput = (evt) => {
    evt.preventDefault();

    setDisableAttribute(false);
  };

  const convertDate = (value) => {
    let dateReturn = moment(value).format("YYYY-MM-DD");
    return dateReturn;
  };

  // const handleChangeGender = (value) => {
  //   console.log(value);
  //   formik.setFieldValue("gender", value.);
  // };

  const options = [
    { value: true, label: "Nam" },
    { value: false, label: "Nữ" },
  ];

  const handleChangeImage = (e) => {
    // lay file tu e
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      // tao doi tuong doc file

      let data = new FormData();

      data.append("name", file.name);
      data.append("avatar", file);
      dispatch(updateAvatar(data.avatar));
      dispatch(getCurrentUser());
    }
  };

  if (isLoading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (error) {
    return <div className="loading">Có lỗi xảy ra... </div>;
  }

  return (
    <div>
      {userfromLocal ? (
        <div className="px-20 user-detail mb-10">
          <h1 className="title font-bold text-center text-3xl mb-10">
            Thông Tin Cá Nhân
          </h1>
          <div className="info-container flex flex-row items-start justify-between">
            <div className="info-basic w-1/3 flex items-start justify-center shadow-lg p-8 border mr-2">
              <div className="flex flex-col items-center justify-center ">
                <img
                  className="rounded-full w-40 h-40"
                  src={user.avatar ? user.avatar : avatar_default}
                  alt="123"
                />

                <label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleChangeImage(e)}
                  />
                  <a className="text-sm italic underline text-gray-500 hover:cursor-pointer">
                    Cập nhật avatar
                  </a>
                </label>

                <div className="flex flex-col items-center mt-2">
                  <h1 className="text-lg font-bold">
                    {user.name ? user.name : ""}
                  </h1>
                  <span className="text-base text-gray-500">
                    {user.email ? user.email : ""}
                  </span>
                  <p className="text-sm text-gray-500">
                    {user.address ? user.address : ""}
                  </p>

                  <CustomizedDialogs
                    title="Danh sách phòng đã đặt"
                    textTrigger="Xem danh sách phòng đã đặt"
                    warningMessage="Vui lòng đăng nhập để xem danh sách phòng đã đặt!"
                  >
                    <BookingList />
                  </CustomizedDialogs>
                </div>
              </div>
            </div>
            <div className="info-detail w-2/3 shadow-lg p-8 border">
              <form onSubmitCapture={formik.handleSubmit}>
                <div className="mb-1 flex flex-row items-center">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-1/5"
                  >
                    Họ và tên
                  </label>
                  <input
                    disabled={disableAttribute}
                    type="text"
                    id="name"
                    className="inputs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="name@flowbite.com"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    required
                  />
                </div>

                <div className="mb-1 flex flex-row items-center">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-1/5"
                  >
                    Email
                  </label>
                  <input
                    disabled={disableAttribute}
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="name@flowbite.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    required
                  />
                </div>

                <div className="mb-1 flex flex-row items-center">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-1/5"
                  >
                    Mật khẩu
                  </label>
                  <input
                    disabled={disableAttribute}
                    type="text"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    required
                  />
                </div>

                <div className="mb-1 flex flex-row items-center">
                  <label
                    htmlFor="birthday"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-1/5"
                  >
                    Ngày sinh
                  </label>
                  <input
                    disabled={disableAttribute}
                    type="date"
                    id="birthday"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={
                      user.birthday ? convertDate(formik.values.birthday) : ""
                    }
                    onChange={formik.handleChange}
                    required
                  />
                </div>

                <div className="mb-1 flex flex-row items-center">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-1/5"
                  >
                    Số điện thoại
                  </label>
                  <input
                    disabled={disableAttribute}
                    type="text"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    required
                  />
                </div>

                <div className="mb-1 flex flex-row items-center">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-1/5"
                  >
                    Địa chỉ
                  </label>
                  <input
                    disabled={disableAttribute}
                    type="text"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    required
                  />
                </div>

                <div className="mb-1 flex flex-row items-center">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-1/5"
                    htmlFor="Name"
                  >
                    Giới tính
                  </label>

                  <CustomSelect
                    classname={
                      "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    }
                    options={options}
                    value={formik.values.gender}
                    onChange={(value) =>
                      formik.setFieldValue("gender", value.value)
                    }
                    isDisabled={disableAttribute}
                  />
                </div>

                <div className="mb-1 flex flex-row items-center">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-1/5"
                  >
                    Loại người dùng
                  </label>
                  <input
                    disabled={disableAttribute}
                    type="text"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={formik.values.type}
                    required
                  />
                </div>

                <div>
                  <button
                    onClick={(e) => {
                      enableInput(e);
                    }}
                    className="mr-3 ease-in-out duration-300 text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Chỉnh sửa thông tin
                  </button>

                  <button
                    type="submit"
                    className="ease-in-out duration-300 text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <span className="not-found italic p-20">
          Vui lòng đăng nhập để xem thông tin!&nbsp;
          <a href="login">
            <button className="text-white p-2 rounded-lg ease-in-out duration-300 text-sm">
              Đăng nhập
            </button>
          </a>
        </span>
      )}
    </div>
  );
};

export default UserDetail;

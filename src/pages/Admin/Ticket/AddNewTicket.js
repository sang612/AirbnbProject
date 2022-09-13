import { useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Form, Radio, Select } from "antd";
import { useState } from "react";
import { getUserList } from "../../../slices/user";
import { getRooms } from "../../../slices/room";
import moment from "moment";
import { Option } from "antd/lib/mentions";
import { createTicket } from "../../../slices/ticket";

const AddNewTicket = () => {
  const { id } = useParams();
  const { userList } = useSelector((state) => state.user);
  const { rooms } = useSelector((state) => state.room);
  const [componentSize, setComponentSize] = useState("default");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList());
    dispatch(getRooms());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id,
      checkIn: "",
      checkOut: "",
      userId: "",
      roomId: "",
    },
    onSubmit: (values) => {
      console.log(values);

      //goi api
      dispatch(createTicket(values));
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const convertSelectKH = () => {
    return userList?.map((user, index) => {
      return { label: user.name, value: user._id };
    });
  };

  const convertSelectKS = () => {
    return rooms?.map((room, index) => {
      return { label: room.name, value: room._id };
    });
  };

  const handleChangeSelect = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const convertDate = (value) => {
    let dateReturn = moment.utc(value).format("YYYY-MM-DD hh:mm:ss");
    return dateReturn;
  };

  const handleChangeDateTimeCheckIn = (e) => {
    formik.setFieldValue("checkIn", e.target.value);
  };

  const handleChangeDateTimeCheckOut = (e) => {
    formik.setFieldValue("checkOut", e.target.value);
  };

  return (
    <div className="p-5">
      <h3 className="text-4xl mb-4 text-center uppercase font-bold">
        Cập Nhật Thông Tin Vé
      </h3>
      <div className="flex flex-row items-center justify-center">
        <div className="w-1/2">
          <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
          >
            <Form.Item label="Form Size" name="size">
              <Radio.Group>
                <Radio.Button value="small">Small</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Thời gian checkin">
              <input
                type="datetime-local"
                id="checkIn"
                className=" border border-gray-300 text-sm rounded-sm block w-full h-9 "
                //   defaultValue={
                //     ticketDetail.checkIn ? convertDate(formik.values.checkIn) : ""
                //   }
                onChange={handleChangeDateTimeCheckIn}
                required
              />
            </Form.Item>

            <Form.Item label="Thời gian checkout">
              <input
                type="datetime-local"
                id="checkOut"
                className=" border border-gray-300 text-sm rounded-sm block w-full h-9 "
                //   defaultValue={
                //     ticketDetail.checkOut
                //       ? convertDate(formik.values.checkOut)
                //       : ""
                //   }
                onChange={handleChangeDateTimeCheckOut}
                required
              />
            </Form.Item>

            <Form.Item label="Khách hàng">
              <Select
                options={convertSelectKH()}
                onChange={handleChangeSelect("userId")}
                value={formik.values.userId}
              />
            </Form.Item>

            <Form.Item label="Khách sạn">
              <Select
                options={convertSelectKS()}
                onChange={handleChangeSelect("roomId")}
                value={formik.values.roomId}
              />
            </Form.Item>

            <Form.Item label="Tác vụ">
              <button type="submit" className="bg-blue-500 text-white p-2">
                Tạo Vé
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddNewTicket;

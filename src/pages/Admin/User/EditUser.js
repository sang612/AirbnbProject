import { useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
} from "antd";
import { useState } from "react";
import { getUserDetail, updateAdmin } from "../../../slices/user";
const EditUser = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [componentSize, setComponentSize] = useState("default");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetail(id));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id,
      name: user?.name,
      email: user?.email,
      password: user?.password,
      address: user.address,
      phone: user.phone,
      birthday: user.birthday,
      gender: user.gender,
      type: user.type,
    },
    onSubmit: (values) => {
      console.log(values);

      //goi api
      dispatch(updateAdmin(values));
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };



  const onChange = (checked) => {
    formik.setFieldValue("gender", checked);
    console.log(moment(formik.values.birthday));
  };

  const options = [
    { label: "Người dùng", value: "CLIENT" },
    { label: "Quản trị", value: "ADMIN" },
  ];

  const handleChangeType = (values) => {
    formik.setFieldValue("type", values);
  };

  const convertDate = (value) => {
    let dateReturn = moment(value).format("YYYY-MM-DD");
    return dateReturn;
  };

  return (
    <div className="p-5">
      <h3 className="text-4xl mb-4 text-center uppercase font-bold">
        Cập Nhật Người Dùng
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
            <Form.Item label="Tên người dùng">
              <Input
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Form.Item>
            <Form.Item label="Mật khẩu">
              <Input
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Form.Item>

            <Form.Item label="Địa chỉ">
              <Input
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </Form.Item>

            <Form.Item label="Số điện thoại">
              <Input
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </Form.Item>

            <Form.Item label="Ngày sinh">
              <input
                type="date"
                id="birthday"
                className=" border border-gray-300 text-sm rounded-sm block w-full h-9 "
                defaultValue={user.birthday ? convertDate(formik.values.birthday) : ""}
                onChange={formik.handleChange}
                required
              />
            </Form.Item>
            <Form.Item label="Giới tính">
              <span>Nữ</span>
              <Switch
                checked={formik.values.gender}
                onChange={onChange}
                className="mx-2"
              />
              <span>Nam</span>
            </Form.Item>

            <Form.Item label="Loại người dùng">
              <Select
                options={options}
                onChange={handleChangeType}
                value={formik.values.type}
                placeholder="Chọn loại người dùng"
              />
            </Form.Item>

            <Form.Item label="Tác vụ">
              <button type="submit" className="bg-blue-500 text-white p-2">
                Cập nhật Người dùng
              </button>
            </Form.Item>
          </Form>
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <img src={user.avatar} alt={user.name} className="w-2/3 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default EditUser;

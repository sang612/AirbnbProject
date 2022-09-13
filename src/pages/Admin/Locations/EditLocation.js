import { useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getLocationDetail,
  updateLocation,
  updateLocationImage,
} from "../../../slices/location";
import { DatePicker, Form, Input, InputNumber, Radio, Switch } from "antd";
import { useState } from "react";

const EditLocation = () => {
  const { id } = useParams();
  const { locationDetail } = useSelector((state) => state.location);
  const [componentSize, setComponentSize] = useState("default");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocationDetail(id));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id,
      name: locationDetail?.name,
      province: locationDetail?.province,
      country: locationDetail?.country,
      valueate: locationDetail.valueate,
    },
    onSubmit: (values) => {
      console.log(values);

      //goi api
      dispatch(updateLocation(values));
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

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

      data.append("id", id);
      data.append("location", file);
      dispatch(updateLocationImage(data));
    }
    setTimeout(() => {
      dispatch(getLocationDetail(id));
    }, 1000);
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  return (
    <div className="p-5">
      <h3 className="text-4xl mb-4 text-center uppercase font-bold">
        Cập Nhật Vị Trí
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
            <Form.Item label="Tên vị trí">
              <Input
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Form.Item>
            <Form.Item label="Tỉnh">
              <Input
                name="province"
                onChange={formik.handleChange}
                value={formik.values.province}
              />
            </Form.Item>
            <Form.Item label="Nước">
              <Input
                name="country"
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Form.Item>
            <Form.Item label="Đánh giá">
              <InputNumber
                onChange={handleChangeInputNumber("valueate")}
                min={1}
                max={10}
                value={formik.values.valueate}
              />
            </Form.Item>

            <Form.Item label="Tác vụ">
              <button type="submit" className="bg-blue-500 text-white p-2">
                Cập nhật Vị trí
              </button>
            </Form.Item>
          </Form>
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <img
            src={locationDetail.image}
            alt={locationDetail.name}
            className="w-2/3 h-auto"
          />
          <label>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) => handleChangeImage(e)}
            />
            <a className="text-sm italic underline text-black hover:cursor-pointer">
              Cập nhật ảnh
            </a>
          </label>
        </div>
      </div>
    </div>
  );
};

export default EditLocation;

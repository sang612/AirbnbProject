import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { addLocation } from "../../../slices/location";
import { Form, Input, InputNumber, Radio } from "antd";
import { useState } from "react";

const AddNewLocation = () => {
  const [componentSize, setComponentSize] = useState("default");

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      province: "",
      country: "",
      valueate: 0,
    },
    onSubmit: (values) => {
      console.log(values);

      //goi api
      dispatch(addLocation(values));
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  return (
    <div className="p-5">
      <h3 className="text-4xl mb-4 text-center uppercase font-bold">
        Tạo Vị Trí
      </h3>
      <div className="flex flex-row items-center justify-center">
        <div className="w-2/3">
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
                Tạo Vị trí
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddNewLocation;

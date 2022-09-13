import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Form, Input, Radio } from "antd";
import { useState } from "react";
import { updateReview } from "../../../slices/review";

const EditReview = () => {
  const { id } = useParams();
  const [componentSize, setComponentSize] = useState("default");

  const dispatch = useDispatch();

  let review = {};
  if (localStorage.getItem("reviewParams")) {
    review = JSON.parse(localStorage.getItem("reviewParams"));
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id,
      content: review?.content,
    },
    onSubmit: (values) => {
      console.log(values);

      //goi api
      dispatch(updateReview(values));
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <div className="p-5">
      <h3 className="text-4xl mb-4 text-center uppercase font-bold">
        Cập Nhật Đánh Giá
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

            <Form.Item label="Tên khách sạn">
              <Input name="content" value={review?.roomId?.name}  disabled={true}/>
            </Form.Item>

            <Form.Item label="Người đánh giá">
              <Input name="content" value={review?.userId?.name}  disabled={true}/>
            </Form.Item>

            <Form.Item label="Nội dung">
              <Input
                name="content"
                onChange={formik.handleChange}
                value={formik.values.content}
               
              />
            </Form.Item>

            <Form.Item label="Tác vụ">
              <button type="submit" className="bg-blue-500 text-white p-2">
                Cập nhật Đánh giá
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditReview;

import { useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
  Select,
} from "antd";
import { useState } from "react";
import {
  createRoom,
  getRoomDetail,
  updateRoom,
  updateRoomImage,
} from "../../../slices/room";
import { getLocationShowing } from "../../../slices/location";

const AddNewRoom = () => {
  const { id } = useParams();
  const { roomDetail } = useSelector((state) => state.room);
  const { locations } = useSelector((state) => state.location);
  const [componentSize, setComponentSize] = useState("default");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomDetail(id));
    dispatch(getLocationShowing());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id,
      name: roomDetail?.name,
      description: roomDetail?.description,
      guests: roomDetail?.guests,
      bedRoom: roomDetail?.bedRoom,
      bath: roomDetail?.bath,
      price: roomDetail?.price,
      elevator: roomDetail?.elevator,
      hotTub: roomDetail?.hotTub,
      pool: roomDetail?.pool,
      indoorFireplace: roomDetail?.indoorFireplace,
      dryer: roomDetail?.dryer,
      gym: roomDetail.gym,
      kitchen: roomDetail.kitchen,
      wifi: roomDetail.wifi,
      heating: roomDetail.heating,
      cableTV: roomDetail.cableTV,
      locationId: roomDetail.locationId,
    },
    onSubmit: (values) => {
      console.log(values);

      //goi api
      dispatch(createRoom(values));
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
      data.append("room", file);
      dispatch(updateRoomImage(data));
    }
    setTimeout(() => {
      dispatch(getRoomDetail(id));
    }, 1000);
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const convertSelectVT = () => {
    return locations?.map((vt, index) => {
      return { label: vt.name, value: vt._id };
    });
  };

  const handleChangeViTri = (values) => {
    formik.setFieldValue("locationId", values);
  };

  return (
    <div className="p-5">
      <h3 className="text-4xl mb-4 text-center uppercase font-bold">
        Tạo Phòng
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
              <Input
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Form.Item>
            <Form.Item label="Mô tả">
              <Input
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Form.Item>

            <Form.Item label="Phòng khách">
              <InputNumber
                onChange={handleChangeInputNumber("guests")}
                min={1}
                max={10}
                value={formik.values.guests}
              />
            </Form.Item>

            <Form.Item label="Phòng tắm">
              <InputNumber
                onChange={handleChangeInputNumber("bath")}
                min={1}
                max={10}
                value={formik.values.bath}
              />
            </Form.Item>

            <Form.Item label="Phòng ngủ">
              <InputNumber
                onChange={handleChangeInputNumber("bedRoom")}
                min={1}
                max={10}
                value={formik.values.bedRoom}
              />
            </Form.Item>

            <Form.Item label="cableTV" valuePropName="checked">
              <Switch
                onChange={handleChangeSwitch("cableTV")}
                checked={formik.values.cableTV}
              />
            </Form.Item>

            <Form.Item label="dryer" valuePropName="checked">
              <Switch
                onChange={handleChangeSwitch("dryer")}
                checked={formik.values.dryer}
              />
            </Form.Item>

            <Form.Item label="elevator" valuePropName="checked">
              <Switch
                onChange={handleChangeSwitch("elevator")}
                checked={formik.values.elevator}
              />
            </Form.Item>

            <Form.Item label="gym" valuePropName="checked">
              <Switch
                onChange={handleChangeSwitch("gym")}
                checked={formik.values.gym}
              />
            </Form.Item>

            <Form.Item label="heating" valuePropName="checked">
              <Switch
                onChange={handleChangeSwitch("heating")}
                checked={formik.values.heating}
              />
            </Form.Item>

            <Form.Item label="kitchen" valuePropName="checked">
              <Switch
                onChange={handleChangeSwitch("kitchen")}
                checked={formik.values.kitchen}
              />
            </Form.Item>

            <Form.Item label="pool" valuePropName="checked">
              <Switch
                onChange={handleChangeSwitch("pool")}
                checked={formik.values.pool}
              />
            </Form.Item>

            <Form.Item label="wifi" valuePropName="checked">
              <Switch
                onChange={handleChangeSwitch("wifi")}
                checked={formik.values.wifi}
              />
            </Form.Item>

            <Form.Item label="Giá">
              <InputNumber
                onChange={handleChangeInputNumber("price")}
                min={1}
                max={200000000}
                value={formik.values.price}
              />
            </Form.Item>

            <Form.Item label="Vị trí">
              <Select
                options={convertSelectVT()}
                onChange={handleChangeViTri}
                placeholder="Chọn vị trí"
              />
            </Form.Item>

            <Form.Item label="Tác vụ">
              <button type="submit" className="bg-blue-500 text-white p-2">
                Tạo Phòng
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddNewRoom;

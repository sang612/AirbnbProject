import React, { Fragment } from "react";
import { Table, Button, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteAndThenGet,
  deleteLocation,
  getLocationShowing,
} from "../../../slices/location";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import admin_default from "../../../assets/img/admin_default.png";
import { useState } from "react";

const Locations = () => {
  const { locations } = useSelector((state) => state.location);
  const dispatch = useDispatch();

 

  const [value, setValue] = useState();
  const [tempValue, setTempValue] = useState();

  useEffect(
    () => {
      // Wait 1000ms before copying the value of tempValue into value;
      const timeout = setTimeout(() => {
        setValue(tempValue);
      }, 1000);

      // If the hook is called again, cancel the previous timeout
      // This creates a debounce instead of a delay
      return () => clearTimeout(timeout);
    },
    // Run the hook every time the user makes a keystroke
    [tempValue]
  );

  useEffect(() => {
    dispatch(getLocationShowing(value));
  }, [value]);

  const onSearch = (value) => {
    dispatch(getLocationShowing(value));
  };

  const { Search } = Input;

  const columns = [
    {
      title: "STT",
      key: "index",

      render: (record) => data.indexOf(record) + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",

      sorter: (a, b) => {
        let nameA = a.length ? a.name.toLowerCase().trim() : a;
        let nameB = b.length ? b.name.toLowerCase().trim() : a;
        if (nameA > nameB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tỉnh",
      dataIndex: "province",
      key: "province",

      sorter: (a, b) => {
        let provinceA = a.length ? a.province.toLowerCase().trim() : a;
        let provinceB = b.length ? b.province.toLowerCase().trim() : b;
        if (provinceA > provinceB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Nước",
      dataIndex: "country",
      key: "country",

      sorter: (a, b) => {
        let countryA = a.length ? a.country.toLowerCase().trim() : a;
        let countryB = b.length ? b.country.toLowerCase().trim() : b;
        if (countryA > countryB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",

      render: (text, location, index) => {
        return (
          <Fragment>
            <img
              className="transition duration-500 hover:scale-300"
              src={location.image ? location.image : admin_default}
              alt={location.name}
              width={50}
              height={50}
              onError={(e) => {
                e.target.onError = null;
                // e.target.src = `https://picsum.photos/${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
    },
    {
      title: "Đánh giá",
      dataIndex: "valueate",
      key: "valueate",

      sorter: (a, b) => a.valueate - b.valueate,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (text, location) => {
        return (
          <Fragment>
            <NavLink to={`/admin/locations/edit/${location._id}`}>
              <EditOutlined className="text-xl mr-5 text-blue-400 hover:text-blue-600 transition duration-500" />
            </NavLink>

            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (window.confirm("Bạn có muốn xóa " + location.name)) {
                  dispatch(deleteAndThenGet(location._id));
                }
              }}
            >
              <DeleteOutlined className="text-xl text-red-400 hover:text-red-600 transition duration-500" />
            </span>
          </Fragment>
        );
      },
      width: "15%",
    },
  ];
  const data = locations;

  const onChange = (pagination, filters, sorter, extra) => {
  };

  const navigate = useNavigate();

  return (

    <div>
      <Button
        className="mt-4"
        onClick={() => {
          navigate("/admin/locations/addnew");
        }}
      >
        Thêm vị trí
      </Button>

      <Search
        className="my-4"
        placeholder="Nhập vị trí"
        onChange={({ target }) => setTempValue(target.value)}
        onSearch={onSearch}
        enterButton
      />
      <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      rowKey="_id"
    />
    </div>
  );
};

export default Locations;

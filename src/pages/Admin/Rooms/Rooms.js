import React, { Fragment } from "react";
import { Table, Button, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import admin_default from "../../../assets/img/admin_default.png";
import { useState } from "react";
import { deleteAndThenGetRoom, getRooms } from "../../../slices/room";

const Rooms = () => {
  const { rooms } = useSelector((state) => state.room);
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
    dispatch(getRooms(value));
  }, [value]);

  const onSearch = (value) => {
    dispatch(getRooms(value));
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
      title: "Mô tả",
      dataIndex: "description",
      key: "description",

      sorter: (a, b) => {
        let descriptionA = a.length ? a.description.toLowerCase().trim() : a;
        let descriptionB = b.length ? b.description.toLowerCase().trim() : b;
        if (descriptionA > descriptionB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      render: (text, room) => {
        return (
          <Fragment>
            {window.innerWidth < 480
              ? room.description?.length > 30
                ? room.description.substr(0, 30) + "..."
                : room.description
              : room.description?.length > 150
              ? room.description.substr(0, 150) + "..."
              : room.description}
          </Fragment>
        );
      },
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
      title: "Phòng khách",
      dataIndex: "guests",
      key: "guests",

      sorter: (a, b) => a.guests - b.guests,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phòng tắm",
      dataIndex: "bath",
      key: "bath",

      sorter: (a, b) => a.bath - b.bath,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phòng ngủ",
      dataIndex: "bedRoom",
      key: "bedRoom",

      sorter: (a, b) => a.bedRoom - b.bedRoom,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",

      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (text, room) => {
        return (
          <Fragment>
            <NavLink to={`/admin/room/edit/${room._id}`}>
              <EditOutlined className="text-xl mr-5 text-blue-400 hover:text-blue-600 transition duration-500" />
            </NavLink>

            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (window.confirm("Bạn có muốn xóa " + room.name)) {
                  dispatch(deleteAndThenGetRoom(room._id));
                }
              }}
            >
              <DeleteOutlined className="text-xl mr-5 text-red-400 hover:text-red-600 transition duration-500" />
            </span>

            <NavLink
              to={`/admin/review/byRoom/${room._id}`}
              className="text-xs bg-green-500 p-1 rounded-md  text-white hover:text-black transition duration-500"
            >
              {/* <EditOutlined className="text-xl mr-5 text-blue-400 hover:text-blue-600 transition duration-500" /> */}
              Xem đánh giá
            </NavLink>
          </Fragment>
        );
      },
      width: "15%",
    },
  ];
  const data = rooms;

  const onChange = (pagination, filters, sorter, extra) => {};

  const navigate = useNavigate();

  return (
    <div>
      <Button
        className="mt-4"
        onClick={() => {
          navigate("/admin/room/addnew");
        }}
      >
        Thêm phòng
      </Button>

      <Search
        className="my-4"
        placeholder="Nhập tên phòng"
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

export default Rooms;

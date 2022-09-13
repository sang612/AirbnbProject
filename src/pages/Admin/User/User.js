import React, { Fragment } from "react";
import { Table, Button, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import admin_default from "../../../assets/img/admin_default.png";
import { useState } from "react";
import { deleteAndThenGetUser, getUserList } from "../../../slices/user";

const User = () => {
  const { userList } = useSelector((state) => state.user);
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
    dispatch(getUserList(value));
  }, [value]);

  const onSearch = (value) => {
    dispatch(getUserList(value));
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
      title: "email",
      dataIndex: "email",
      key: "email",

      sorter: (a, b) => {
        let emailA = a.length ? a.email.toLowerCase().trim() : a;
        let emailB = b.length ? b.email.toLowerCase().trim() : b;
        if (emailA > emailB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",

      render: (text, location, index) => {
        return (
          <Fragment>
            <img
              className="transition duration-500 hover:scale-300"
              src={location.avatar ? location.avatar : admin_default}
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
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",

      sorter: (a, b) => {
        let phoneA = a.length ? a.phone.toLowerCase().trim() : a;
        let phoneB = b.length ? b.phone.toLowerCase().trim() : b;
        if (phoneA > phoneB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (text, location) => {
        return (
          <Fragment>
            <NavLink to={`/admin/user/edit/${location._id}`}>
              <EditOutlined className="text-xl mr-5 text-blue-400 hover:text-blue-600 transition duration-500" />
            </NavLink>

            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (window.confirm("Bạn có muốn xóa " + location.name)) {
                  dispatch(deleteAndThenGetUser(location._id));
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
  const data = userList;

  const onChange = (pagination, filters, sorter, extra) => {};

  const navigate = useNavigate();

  return (
    <div>
      <Button
        className="mt-4"
        onClick={() => {
          navigate("/admin/user/addnew");
        }}
      >
        Thêm Người dùng
      </Button>

      <Search
        className="my-4"
        placeholder="Nhập tên người dùng"
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

export default User;

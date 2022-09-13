import React, { Fragment } from "react";
import { Table, Button, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import admin_default from "../../../assets/img/admin_default.png";
import { useState } from "react";
import { deleteAndThenGetTickets, getTicketList } from "../../../slices/ticket";
const Ticket = () => {
  const { ticketList } = useSelector((state) => state.ticket);
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
    dispatch(getTicketList(value));
  }, [value]);

  const onSearch = (value) => {
      dispatch(getTicketList(value));
  };

  const { Search } = Input;

  const columns = [
    {
      title: "STT",
      key: "index",

      render: (record) => data.indexOf(record) + 1,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "userId.name",
      key: "name",

      sorter: (a, b) => {
        let nameA = a.length ? a.userId.name.toLowerCase().trim() : a;
        let nameB = b.length ? b.userId.name.toLowerCase().trim() : a;
        if (nameA > nameB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      render: (text, ticket) => {
        return <Fragment>{ticket.userId?.name}</Fragment>;
      },
    },
    {
      title: "Tên khách sạn",
      dataIndex: "roomId.name",
      key: "roomId.name",

      sorter: (a, b) => {
        let provinceA = a.length ? a.roomId.name.toLowerCase().trim() : a;
        let provinceB = b.length ? b.roomId.name.toLowerCase().trim() : b;
        if (provinceA > provinceB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      render: (text, ticket) => {
        return <Fragment>{ticket.roomId?.name}</Fragment>;
      },
    },
    {
      title: "Giờ checkin",
      dataIndex: "checkIn",
      key: "checkIn",
    },
    {
      title: "Giờ checkout",
      dataIndex: "checkOut",
      key: "checkOut",
    },

    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (text, ticket) => {
        return (
          <Fragment>
            <NavLink to={`/admin/ticket/edit/${ticket._id}`}>
              <EditOutlined className="text-xl mr-5 text-blue-400 hover:text-blue-600 transition duration-500" />
            </NavLink>

            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (window.confirm("Bạn có muốn xóa vé này")) {
                  dispatch(deleteAndThenGetTickets(ticket._id));
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
  const data = ticketList;

  const onChange = (pagination, filters, sorter, extra) => {};

  const navigate = useNavigate();

  return (
    <div>
      <Button
        className="mt-4"
        onClick={() => {
          navigate("/admin/ticket/addnew");
        }}
      >
        Tạo Vé mới
      </Button>

      <Search
        className="my-4"
        placeholder="Nhập tên người dùng hoặc tên khách sạn..."
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

export default Ticket;

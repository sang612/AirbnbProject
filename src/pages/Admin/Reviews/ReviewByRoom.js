import React, { Fragment } from "react";
import { Table, Button, Input } from "antd";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteReview, getReviewByRoomId } from "../../../slices/review";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import admin_default from "../../../assets/img/admin_default.png";
import { useState } from "react";

const ReviewByRoom = () => {
  const { id } = useParams();
  const { reviews } = useSelector((state) => state.review);
  const dispatch = useDispatch();

  const [value, setValue] = useState();
  const [tempValue, setTempValue] = useState();

  useEffect(() => {
    dispatch(getReviewByRoomId(id));
  }, []);

  const columns = [
    {
      title: "STT",
      key: "index",

      render: (record) => data.indexOf(record) + 1,
    },
    {
      title: "Tên người đánh giá",
      dataIndex: "userId?.name",
      key: "userId.name",
      sorter: (a, b) => {
        let emailA = a.length ? a.userId.name.toLowerCase().trim() : a;
        let emailB = b.length ? b.userId.name.toLowerCase().trim() : b;
        if (emailA > emailB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      render: (text, review, index) => {
        return <Fragment>{review.userId?.name}</Fragment>;
      },
    },
    {
      title: "Email",
      dataIndex: "userId.email",
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
      render: (text, review, index) => {
        return <Fragment>{review.userId?.email}</Fragment>;
      },
    },

    {
      title: "Avatar",
      dataIndex: "userId.avatar",
      key: "avatar",

      render: (text, review, index) => {
        return (
          <Fragment>
            <img
              className="transition duration-500 hover:scale-300"
              src={
                review.userId?.avatar ? review.userId?.avatar : admin_default
              }
              alt={review.userId?.name}
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
      title: "Khách sạn",
      dataIndex: "roomId.name",
      key: "roomId.name",

      render: (text, review, index) => {
        return <Fragment>{review.roomId?.name}</Fragment>;
      },
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",

      sorter: (a, b) => {
        let contentA = a.length ? a.content.toLowerCase().trim() : a;
        let contentB = b.length ? b.content.toLowerCase().trim() : a;
        if (contentA > contentB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (text, review) => {
        return (
          <Fragment>
            <NavLink
              to={`/admin/review/edit/${review._id}`}
              onClick={() => {
                localStorage.setItem("reviewParams", JSON.stringify(review));
              }}
            >
              <EditOutlined className="text-xl mr-5 text-blue-400 hover:text-blue-600 transition duration-500" />
            </NavLink>

            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (window.confirm("Bạn có muốn xóa đánh giá này")) {
                  dispatch(deleteReview(review._id));
                }
              }}
            >
              <DeleteOutlined className="text-xl mr-5 text-red-400 hover:text-red-600 transition duration-500" />
            </span>
          </Fragment>
        );
      },
      width: "15%",
    },
  ];
  const data = reviews;

  const onChange = (pagination, filters, sorter, extra) => {};

  const navigate = useNavigate();

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey="_id"
      />
    </div>
  );
};

export default ReviewByRoom;

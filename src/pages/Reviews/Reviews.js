import React from "react";
import Zoom from "react-medium-image-zoom";
import { Link } from "react-router-dom";
import binz from '../../assets/img/binz.png'

const Reviews = () => {
  return (
    <div className="px-20 flex post bg-gray-200">
      <div className="m-auto my-3 w-128">
        <div className="mb-5 bg-white rounded-lg shadow-lg ">
          <div className="px-3">
            <div className="italic text-base pt-3">
              <b>Sơn Tùng</b> đã đăng bài viết về{" "}
              <Link
                to="/roomDetail/62767b58fee2fc001cdd386f"
                className="font-bold hover:underline"
              >
                Nhà Nghỉ SUNSHINE MOTEL
              </Link>
            </div>
            <div className="flex flex-row mt-1 items-center">
              <div>
                <img
                  className="rounded-full w-11 h-11 mr-2"
                  src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/9/6/753212/Son-Tung-Mtp.jpg"
                  alt=""
                />
              </div>
              <div className="flex flex-col ">
                <h3 className="text-sm font-bold">Sơn Tùng MTP</h3>
                <span className="text-xs text-gray-600">6 giờ</span>
              </div>
            </div>
            <p className="my-1">
              Nhân viên nhiệt tình, phòng có view đẹp, Tùng rất ưng.
            </p>
          </div>
          <div>
            <Zoom>
              <img
                src="https://kenh14cdn.com/thumb_w/660/2020/2/20/67062796544900156348432132282350381482066n-1582170387737706314425.jpg"
                alt="st"
                className="w-full h-auto"
              />
            </Zoom>
          </div>
        </div>

        <div className="mb-5 bg-white rounded-lg shadow-lg ">
          <div className="px-3">
            <div className="italic text-base pt-3">
              <b>Đen Vâu</b> đã đăng bài viết về{" "}
              <Link
                to="/roomDetail/617236b1efe193001c0a7a23"
                className="font-bold hover:underline"
              >
                Mango Beach Resort Phú Quốc
              </Link>
            </div>
            <div className="flex flex-row mt-1 items-center">
              <div>
                <img
                  className="rounded-full w-11 h-11 mr-2"
                  src="https://khds.1cdn.vn/2021/12/31/den-vau-9520.jpg"
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-bold">Đen Vâu</h3>
                <span className="text-xs text-gray-600">2 ngày</span>
              </div>
            </div>
            <p className="my-1">Đồ ăn ngon, có hồ bơi rộng.</p>
          </div>
          <div>
            <Zoom>
              <img
                src="https://i1.sndcdn.com/artworks-iQV6MyEjs49sDhgD-QL6aJw-t500x500.jpg"
                alt="st"
                className="w-full h-auto"
              />
            </Zoom>
          </div>
        </div>

        <div className="mb-5 bg-white rounded-lg shadow-lg ">
          <div className="px-3">
            <div className="italic text-base pt-3">
              <b>Binz</b> đã đăng bài viết về{" "}
              <Link
                to="/roomDetail/618f6187d1aba6001cefbf56"
                className="font-bold hover:underline"
              >
                FLC Grand Hotel
              </Link>
            </div>
            <div className="flex flex-row mt-1 items-center">
              <div>
                <img
                  className="rounded-full w-11 h-11 mr-2"
                  src="https://benhvienthammykangnam.vn/wp-content/uploads/2022/01/binz.jpg"
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-bold">Binz</h3>
                <span className="text-xs text-gray-600">2 ngày</span>
              </div>
            </div>
            <p className="my-1">Phòng rộng, sạch sẽ, vị trí ở khu trung tâm.</p>
          </div>
          <div>
            <Zoom>
              <img
                src={binz}
                alt="st"
                className="w-full h-auto"
              />
            </Zoom>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

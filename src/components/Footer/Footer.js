import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 footer">
      <div className="px-20 py-10 containerss">
        <div className="item-contain flex flex-row items-start justify-between">
          <div className="cols flex flex-col max-w-xs">
            <h3 className="uppercase mb-3 font-bold">GIỚI THIỆU</h3>
            <div className="flex flex-col gap-2 text-sm links">
              <Link to="how">Phương thức hoạt động của Airbnb</Link>
              <Link to="news">Trang tin tức</Link>
              <Link to="plus">Nhà đầu tư</Link>
              <Link to="axe">Airbnb Plus</Link>
              <Link to="luxe">Airbnb Luxe</Link>
              <Link to="HotelTonight">HotelTonight</Link>
              <Link to="work">Airbnb for work</Link>
              <Link to="host">Nhờ có host, mọi điều đều có thể</Link>
              <Link to="jobs">Cơ hội nghề nghiệp</Link>
              <Link to="mails">Thư của nhà sáng lập</Link>
            </div>
          </div>

          <div className="cols flex flex-col max-w-xs">
            <h3 className="uppercase mb-3 font-bold">cộng đồng</h3>
            <div className="flex flex-col gap-2 text-sm links">
              <Link to="variant">Sự đa dạng và Cảm giác thân thuộc</Link>
              <Link to="disabilities">Tiện nghi phù hợp cho người khuyết tật</Link>
              <Link to="partner">Đối tác liên kết Airbnb</Link>
              <Link to="top">Chổ ở cho tuyến đầu</Link>
              <Link to="introduce">Lượt giới thiệu của khách</Link>
              <Link to="Airbnb.org">Airbnb.org</Link>
            </div>
          </div>

          <div className="cols flex flex-col max-w-xs">
            <h3 className="uppercase mb-3 font-bold">đón tiếp khách</h3>
            <div className="flex flex-col gap-2 text-sm links">
              <Link to="/">Cho thuê nhà</Link>
              <Link to="reviews-online">Tổ chức Trải nghiệm trực tuyến</Link>
              <Link to="reviews">Tổ chức trải nghiệm</Link>
              <Link to="welcome">Đón tiếp khách có trách nhiệm</Link>
              <Link to="center">Trung tâm tài nguyên</Link>
              <Link to="comunity">Trung tâm cộng đồng</Link>
            </div>
          </div>

          <div className="cols flex flex-col max-w-xs">
            <h3 className="uppercase mb-3 font-bold">hỗ trợ</h3>
            <div className="flex flex-col gap-2 text-sm links">
              <Link to="covid">Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi</Link>
              <Link to="helps">Trung tâm trợ giúp</Link>
              <Link to="cancels">Các tùy chọn hủy</Link>
              <Link to="support">Hở trợ khu dân cư</Link>
              <Link to="safety">Tin cậy và an toàn</Link>
            </div>
          </div>
        </div>
        <hr className="mt-10 mb-5" />
        <div className="flex flex-row justify-between text-sm copyright">
          <div className="copyright-item">
            <span>
              © 2021 Airbnb, Inc. All rights reserved
              <span>
                &nbsp;&middot;&nbsp;<Link className="links-item" to="privaty">Quyền riêng tư</Link>
                &nbsp;&middot;&nbsp;<Link className="links-item" to="rules">Điều khoản</Link>&nbsp;&middot;&nbsp;
                <Link className="links-item" to="map">Sơ đồ trang web</Link>
              </span>
            </span>
          </div>
          <div className="flex flex-row social">
            <div className="mr-5">
              <i className="fa-solid fa-globe mr-2"></i>
              <span className="underline links-item">Tiếng Việt(VN)</span>
            </div>

            <div className="mr-14">
              <span className="mr-2">₫</span>
              <span className="underline links-item">VNĐ</span>
            </div>
            <div className="mr-5">
              <i className="fa-brands fa-facebook-f icon"></i>
              <i className="fa-brands fa-twitter mx-5 icon"></i>
              <i className="fa-brands fa-square-instagram icon"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

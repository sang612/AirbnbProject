import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketByUserId } from "../../slices/ticket";
import { userfromLocal } from "../../utils/settings/config";
import moment from "moment";

const BookingList = () => {
  const { ticketList } = useSelector((state) => state.ticket);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTicketByUserId(userfromLocal._id));
  }, []);

  const convertDate = (value) => {
    if (!value) {
      return "...";
    }
    let dateReturn = moment(value).format("DD/MM/YYYY hh:mm:ss A");
    return dateReturn;
  };

  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Tên khách sạn
            </th>
            <th scope="col" className="py-3 px-6">
              Thời gian checkin
            </th>
            <th scope="col" className="py-3 px-6">
              Thời gian checkout
            </th>
          </tr>
        </thead>
        <tbody>
          {ticketList.length ? (
            ticketList.map((ticket, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {ticket.roomId.name}
                  </th>
                  <td className="py-4 px-6">{convertDate(ticket.checkIn)}</td>
                  <td className="py-4 px-6">{convertDate(ticket.checkOut)}</td>
                </tr>
              );
            })
          ) : (
            <tr className="not-found italic">
              <td className="py-4 px-6">Bạn chưa đặt phòng nào!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;

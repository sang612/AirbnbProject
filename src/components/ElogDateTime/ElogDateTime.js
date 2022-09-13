import React, { useEffect, useRef, useState } from "react";
export default function ElogDateTime({ selected, handleChange }) {
  const [date, setDate] = useState(selected && selected.split(" ")[0]);
  const [time, setTime] = useState(selected && selected.split(" ")[1]);
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  useEffect(() => {
    if (!date || !time) return;
  }, [date, time]);

  function _handleChange(e) {
    // onChange();
    const value = e.target.value;
    const elid = e.target.id;
    let newStr;

    if ("elogdate" === elid) {
      setDate(value);
      newStr = new String("").concat(
        value || "0000-00-00",
        " ",
        time || "00:00"
      );
    } else if ("elogtime" === elid) {
      setTime(value);
      newStr = new String("").concat(
        date || "0000-00-00",
        " ",
        value || "00:00"
      );
    }
    handleChange(newStr);
  }

  return (
    <>
      <div className="flex flex-row ">
        <input
          className="rounded-lg w-full max-h-9 mr-2"
          id="elogdate"
          ref={dateRef}
          value={date ? date : ""}
          onChange={_handleChange}
          type="date"
        />
        <input
          className="rounded-lg w-full max-h-9"
          id="elogtime"
          ref={timeRef}
          value={time ? time : ""}
          onChange={_handleChange}
          type="time"
        />
      </div>
    </>
  );
}

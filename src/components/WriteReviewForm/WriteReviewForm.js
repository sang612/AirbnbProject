import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getReviewByRoomId } from "../../slices/review";
import { createReview } from "../../slices/room";

const WriteReviewForm = ({ roomId }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const handleSubmitReview = (value) => {
    const data = {
      roomId: roomId,
      content: value,
    };
    dispatch(createReview(data));
    dispatch(getReviewByRoomId(roomId))
  };

  return (
    <div className="flex items-center justify-center min-h-fit   register">
      <div className="px-3  text-left bg-white  w-full">
        <form onSubmit={handleSubmit(handleSubmitReview)}>
          <div className="mt-4">
            <div className="mt-2">
              <textarea
                rows="5"
                cols="50"
                {...register("content", { required: true })}
                placeholder="Nhập đánh giá của bạn"
                className="w-full h-full px-4 py-2 border rounded-md focus:outline-none focus:border-none"
              ></textarea>
            </div>

            {/* <span className="text-xs text-red-400">
            {error.length ? error : ""}
          </span> */}

            <div className="flex">
              <button
                type="submit"
                className="w-full ease-in-out duration-300 uppercase px-6 py-2 mt-4 text-white  rounded-lg "
              >
                Đánh giá
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReviewForm;

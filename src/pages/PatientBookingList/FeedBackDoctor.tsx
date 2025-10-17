import { Image, Modal, Rate } from "antd/lib";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { PatientFeedback } from "../../api/Patient/PatientApi";
type dataToFeedBackModel = {
  doctorId?: number;
  patientId?: number;
  rate?: number;
  description?: string;
  doctorName?: string;
  doctorAvatar?: string;
  bookingId?: string | number;
};
type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  dataToFeedBack: dataToFeedBackModel;
  handlePatientBookings: () => void;
};

const FeedBackDoctor = ({
  isModalOpen,
  setIsModalOpen,
  dataToFeedBack,
  handlePatientBookings,
}: Props) => {
  const [value, setValue] = useState(5);
  const [ratingDes, setRatingDes] = useState("");
  const handleFeedbackDoctor = async () => {
    if (!ratingDes && ratingDes.length === 0) {
      toast.warning("Hãy viết đánh giá trước");
      return;
    }
    if (!value && value === 0) {
      toast.warning("Vui lòng đánh giá bác sĩ trước");
      return;
    }

    const data = {
      doctorId: dataToFeedBack.doctorId,
      patientId: dataToFeedBack.patientId,
      description: ratingDes,
      rate: value,
      bookingId: dataToFeedBack.bookingId,
    };
    console.log("🚀 ~ handleFeedbackDoctor ~ data:", data);
    // return;
    await PatientFeedback(data).then(() => {
      toast.success("Đã gửi đánh giá ");
      handlePatientBookings();
      setIsModalOpen(false);
    });
  };
  return (
    <div>
      <Modal
        title="Đánh giá"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleFeedbackDoctor}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <div className="flex flex-col gap-3">
          <div>
            <Image src={dataToFeedBack.doctorAvatar} width={100} />

            <p>Bác sĩ: {dataToFeedBack.doctorName}</p>
          </div>
          <Rate allowHalf defaultValue={value} onChange={setValue} />
          <div>
            <p>Viết đánh giá:</p>
            <textarea
              rows={4}
              cols={50}
              className="border border-blue-300 focus:border-blue-300 w-full"
              onChange={(e) => {
                setRatingDes(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FeedBackDoctor;

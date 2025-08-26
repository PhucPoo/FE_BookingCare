import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import "./ServiceList.css";
import { Button } from "antd";
import ModalAddServices from "./ModalAddServices";
const ServiceList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="container">
        <Button
          type="primary"
          icon={<IoIosAddCircle />}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Thêm mới
        </Button>
      </div>
      <ModalAddServices
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default ServiceList;
